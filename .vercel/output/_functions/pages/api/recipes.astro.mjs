import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  const supabase = await getSupabaseServer(cookies);
  try {
    const data = await request.json();
    const { producto_id, nombre_receta, cantidad_base, ingredientes } = data;
    if (!producto_id || !nombre_receta || !cantidad_base || !ingredientes || ingredientes.length === 0) {
      return new Response(JSON.stringify({
        message: "Faltan datos obligatorios"
      }), { status: 400 });
    }
    const { data: receta, error: recetaError } = await supabase.from("recetas").insert({
      producto_id,
      nombre_receta,
      cantidad_base: parseInt(cantidad_base)
    }).select().single();
    if (recetaError) {
      console.error("Error creando receta:", recetaError);
      return new Response(JSON.stringify({
        message: "Error al crear la receta: " + recetaError.message
      }), { status: 500 });
    }
    const ingredientesData = ingredientes.map((ing) => ({
      receta_id: receta.id,
      materia_prima_id: ing.materia_prima_id,
      cantidad_necesaria: parseFloat(ing.cantidad_necesaria),
      unidad_medida: ing.unidad_medida
    }));
    const { error: ingError } = await supabase.from("receta_ingredientes").insert(ingredientesData);
    if (ingError) {
      console.error("Error agregando ingredientes:", ingError);
      await supabase.from("recetas").delete().eq("id", receta.id);
      return new Response(JSON.stringify({
        message: "Error al guardar ingredientes. Intenta de nuevo."
      }), { status: 500 });
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Fórmula guardada correctamente"
    }), { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({
      message: "Error interno del servidor"
    }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
