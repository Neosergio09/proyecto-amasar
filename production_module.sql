-- 1. Create Recipes Table
create table if not exists recetas (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid references productos(id) not null,
  nombre_receta text not null,
  cantidad_base integer not null default 1, -- Base amount this recipe produces (e.g., 100 cookies)
  created_at timestamptz default now()
);

-- 2. Create Recipe Ingredients Table
create table if not exists receta_ingredientes (
  id uuid primary key default gen_random_uuid(),
  receta_id uuid references recetas(id) on delete cascade not null,
  materia_prima_id uuid references materias_primas(id) not null,
  cantidad_necesaria numeric not null, -- Amount needed for the 'cantidad_base'
  unidad_medida text not null -- Just for reference, logic uses the numeric value
);

-- 3. Production Execution Function (Transactional)
-- Input:
--   p_producto_id: The ID of the product being produced.
--   p_cantidad_a_producir: The quantity being produced (e.g., 50 cookies).
create or replace function execute_production_order(
  p_producto_id uuid,
  p_cantidad_a_producir numeric
) returns json as $$
declare
  v_receta record;
  v_factor numeric;
  v_ingrediente record;
  v_stock_actual numeric;
  v_cantidad_consumir numeric;
begin
  -- 1. Get the active recipe (assuming one per product for now, or take the latest)
  select * into v_receta from recetas 
  where producto_id = p_producto_id 
  limit 1;

  if v_receta is null then
    return json_build_object('success', false, 'message', 'No recipe found for this product');
  end if;

  -- 2. Calculate Scaling Factor
  -- Example: Base is 100. Producing 50. Factor = 0.5.
  v_factor := p_cantidad_a_producir / v_receta.cantidad_base;

  -- 3. Validation Phase: Check stock for ALL ingredients BEFORE updating anything
  for v_ingrediente in 
    select ri.materia_prima_id, ri.cantidad_necesaria, mp.nombre, mp.stock_actual
    from receta_ingredientes ri
    join materias_primas mp on ri.materia_prima_id = mp.id
    where ri.receta_id = v_receta.id
  loop
    v_cantidad_consumir := v_ingrediente.cantidad_necesaria * v_factor;
    
    if v_ingrediente.stock_actual < v_cantidad_consumir then
      return json_build_object(
        'success', false, 
        'message', 'Insufficient stock for: ' || v_ingrediente.nombre || '. Needed: ' || v_cantidad_consumir || ', Available: ' || v_ingrediente.stock_actual
      );
    end if;
  end loop;

  -- 4. Execution Phase: Update stock
  -- Since validation passed, we can safely update.
  for v_ingrediente in 
    select ri.materia_prima_id, ri.cantidad_necesaria
    from receta_ingredientes ri
    where ri.receta_id = v_receta.id
  loop
    v_cantidad_consumir := v_ingrediente.cantidad_necesaria * v_factor;
    
    update materias_primas 
    set stock_actual = stock_actual - v_cantidad_consumir,
        ultima_actualizacion = now()
    where id = v_ingrediente.materia_prima_id;
  end loop;

  return json_build_object('success', true, 'message', 'Production recorded and inventory updated');

exception when others then
  return json_build_object('success', false, 'message', SQLERRM);
end;
$$ language plpgsql;
