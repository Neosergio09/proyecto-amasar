import type { APIRoute } from "astro";
import { getSupabaseServer } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = await getSupabaseServer(cookies);

    try {
        let data;
        try {
            data = await request.json();
        } catch (parseError) {
            return new Response(JSON.stringify({
                success: false,
                message: "Error al leer los datos de la petición (JSON inválido)."
            }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        const { producto_id, cantidad } = data;
        const cantidadNumerica = Number(cantidad);

        if (!producto_id || isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
            return new Response(JSON.stringify({
                success: false,
                message: "Datos inválidos (Producto o Cantidad incorrectos)"
            }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        // 1. Execute Production (Offsets Stock)
        const { data: rpcData, error: rpcError } = await supabase.rpc('execute_production_order', {
            p_producto_id: producto_id,
            p_cantidad_a_producir: cantidadNumerica
        });

        if (rpcError) {
            console.error('RPC Error:', rpcError);
            return new Response(JSON.stringify({
                success: false,
                message: "Error al ejecutar producción en la base de datos: " + (rpcError.message || JSON.stringify(rpcError))
            }), { status: 500, headers: { "Content-Type": "application/json" } });
        }

        const result = rpcData as { success: boolean; message: string };

        if (!result || !result.success) {
            return new Response(JSON.stringify({
                success: false,
                message: result?.message || "Error desconocido en producción"
            }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        // 2. Fetch Recipe Details for WhatsApp (Prep List)
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
            console.error('Error fetching recipe details:', recipeError);
            return new Response(JSON.stringify({
                success: true,
                message: "Producción registrada exitosamente, pero hubo un error generando la lista de ingredientes.",
                productName: 'Producto Desconocido',
                recipeName: 'Receta Desconocida',
                quantity: cantidadNumerica,
                ingredients: []
            }), { status: 200, headers: { "Content-Type": "application/json" } });
        }

        // 3. Calculate Totals for this Batch
        const factor = cantidadNumerica / recipe.cantidad_base;

        const ingredientsList = (recipe.receta_ingredientes || []).map((ri: any) => {
            const materialName = Array.isArray(ri.materias_primas)
                ? ri.materias_primas[0]?.nombre
                : ri.materias_primas?.nombre;

            return {
                nombre: materialName || 'Insumo Desconocido',
                cantidad: (ri.cantidad_necesaria * factor).toFixed(2),
                unidad: ri.unidad_medida || 'unidades'
            };
        });

        const prodData = recipe.productos as any;
        const productNameStr = Array.isArray(prodData)
            ? prodData[0]?.nombre
            : prodData?.nombre;

        return new Response(JSON.stringify({
            success: true,
            message: "Producción lanzada con éxito",
            productName: productNameStr || 'Producto Desconocido',
            recipeName: recipe.nombre_receta,
            quantity: cantidadNumerica,
            ingredients: ingredientsList
        }), { status: 200, headers: { "Content-Type": "application/json" } });

    } catch (error: any) {
        console.error('Server Internal Error API Launch:', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error interno del servidor: " + (error.message || String(error))
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
};
