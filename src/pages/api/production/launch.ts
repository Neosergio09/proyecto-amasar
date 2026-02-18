import type { APIRoute } from "astro";
import { getSupabaseServer } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = await getSupabaseServer(cookies);

    try {
        const data = await request.json();
        const { producto_id, cantidad } = data;

        if (!producto_id || !cantidad || Number(cantidad) <= 0) {
            return new Response(JSON.stringify({
                message: "Datos inválidos (Producto o Cantidad)"
            }), { status: 400 });
        }

        // 1. Execute Production (Offsets Stock)
        const { data: rpcData, error: rpcError } = await supabase.rpc('execute_production_order', {
            p_producto_id: producto_id,
            p_cantidad_a_producir: cantidad
        });

        if (rpcError) {
            console.error('RPC Error:', rpcError);
            return new Response(JSON.stringify({
                message: "Error al ejecutar producción: " + rpcError.message
            }), { status: 500 });
        }

        const result = rpcData as { success: boolean; message: string };

        if (!result.success) {
            return new Response(JSON.stringify({
                message: result.message
            }), { status: 400 });
        }

        // 2. Fetch Recipe Details for WhatsApp (Prep List)
        // We need the base quantity to calculate the factor again for the display
        const { data: recipe, error: recipeError } = await supabase
            .from('recetas')
            .select(`
        cantidad_base,
        nombre_receta,
        receta_ingredientes (
          cantidad_necesaria,
          unidad_medida,
          materias_primas ( nombre )
        ),
        productos ( nombre )
      `)
            .eq('producto_id', producto_id)
            .single();

        if (recipeError || !recipe) {
            // Production succeeded but failed to fetch details. We typically shouldn't fail the request here,
            // just return success without details? Or log it?
            // Let's return what we can.
            console.error('Error fetching recipe details:', recipeError);
            return new Response(JSON.stringify({
                success: true,
                message: "Producción registrada, pero no se pudo generar la lista de ingredientes."
            }), { status: 200 });
        }

        // 3. Calculate Totals for this Batch
        const factor = cantidad / recipe.cantidad_base;

        const ingredientsList = recipe.receta_ingredientes.map((ri: any) => {
            // Supabase join might return array or object depending on types
            const materialName = Array.isArray(ri.materias_primas)
                ? ri.materias_primas[0]?.nombre
                : ri.materias_primas?.nombre;

            return {
                nombre: materialName || 'Desconocido',
                cantidad: (ri.cantidad_necesaria * factor).toFixed(2), // Format nicely
                unidad: ri.unidad_medida
            };
        });

        return new Response(JSON.stringify({
            success: true,
            message: "Producción lanzada con éxito",
            data: {
                productName: recipe.productos.nombre,
                recipeName: recipe.nombre_receta,
                quantity: cantidad,
                ingredients: ingredientsList
            }
        }), { status: 200 });

    } catch (error: any) {
        console.error('Server Error:', error);
        return new Response(JSON.stringify({
            message: "Error interno del servidor: " + error.message
        }), { status: 500 });
    }
};
