-- =============================================
-- 1. Function: Set Default Order Status
-- Logic: Ensures new orders start as 'Preparación'
-- =============================================
CREATE OR REPLACE FUNCTION set_default_order_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Apply only if status is not provided
    IF NEW.estado IS NULL THEN
        NEW.estado := 'Preparación';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Before Insert on 'pedidos'
DROP TRIGGER IF EXISTS trg_set_initial_status ON pedidos;
CREATE TRIGGER trg_set_initial_status
BEFORE INSERT ON pedidos
FOR EACH ROW
EXECUTE FUNCTION set_default_order_status();


-- =============================================
-- 2. Function: Manage Inventory (Auto Stock)
-- Logic: 
--   - Deducts stock on INSERT.
--   - Restocks if status -> 'Cancelado'.
--   - Deducts again if status 'Cancelado' -> Active.
--   - Parsers JSONB 'detalles' array.
-- =============================================
CREATE OR REPLACE FUNCTION manage_order_inventory()
RETURNS TRIGGER AS $$
DECLARE
    item jsonb;
    v_producto_id uuid;  -- Assuming UUID as per src/types/database.ts (Product.id: string)
    v_cantidad int;
BEGIN
    -- A. Handle New Orders (INSERT)
    IF (TG_OP = 'INSERT') THEN
        FOR item IN SELECT * FROM jsonb_array_elements(NEW.detalles) LOOP
            -- Extract ID and Qty (ensure JSON keys match your app: 'id', 'cantidad')
            v_producto_id := (item->>'id')::uuid;
            v_cantidad := (item->>'cantidad')::int;
            
            -- Deduct Stock (Negative Stock is ALLOWED by policy)
            UPDATE productos
            SET stock_cantidad = stock_cantidad - v_cantidad
            WHERE id = v_producto_id;
        END LOOP;
    
    -- B. Handle Status Changes (UPDATE)
    ELSIF (TG_OP = 'UPDATE') THEN
        
        -- Case 1: Order Cancelled -> Restock
        -- Check if status changed TO 'Cancelado' from something else
        IF (OLD.estado IS DISTINCT FROM 'Cancelado' AND NEW.estado = 'Cancelado') THEN
             FOR item IN SELECT * FROM jsonb_array_elements(NEW.detalles) LOOP
                v_producto_id := (item->>'id')::uuid;
                v_cantidad := (item->>'cantidad')::int;
                
                UPDATE productos
                SET stock_cantidad = stock_cantidad + v_cantidad
                WHERE id = v_producto_id;
            END LOOP;
            
        -- Case 2: Order Re-opened -> Deduct Stock Again
        -- Check if status changed FROM 'Cancelado' to something else (e.g. 'Preparación')
        ELSIF (OLD.estado = 'Cancelado' AND NEW.estado IS DISTINCT FROM 'Cancelado') THEN
             FOR item IN SELECT * FROM jsonb_array_elements(NEW.detalles) LOOP
                v_producto_id := (item->>'id')::uuid;
                v_cantidad := (item->>'cantidad')::int;
                
                UPDATE productos
                SET stock_cantidad = stock_cantidad - v_cantidad
                WHERE id = v_producto_id;
            END LOOP;
        END IF;
        
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: After Insert/Update on 'pedidos'
DROP TRIGGER IF EXISTS trg_inventory_change ON pedidos;
CREATE TRIGGER trg_inventory_change
AFTER INSERT OR UPDATE ON pedidos
FOR EACH ROW
EXECUTE FUNCTION manage_order_inventory();
