import type { APIRoute } from "astro";
import { getSupabaseServer } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
    const supabase = await getSupabaseServer(cookies);

    try {
        const data = await request.json();
        const { producto_id, nombre_receta, cantidad_base, ingredientes } = data;

        // Validation
        if (!producto_id || !nombre_receta || !cantidad_base || !ingredientes || ingredientes.length === 0) {
            return new Response(JSON.stringify({
                message: "Faltan datos obligatorios"
            }), { status: 400 });
        }

        // 1. Create Recipe Header
        const { data: receta, error: recetaError } = await supabase
            .from('recetas')
            .insert({
                producto_id,
                nombre_receta,
                cantidad_base: parseInt(cantidad_base)
            })
            .select()
            .single();

        if (recetaError) {
            console.error('Error creando receta:', recetaError);
            return new Response(JSON.stringify({
                message: "Error al crear la receta: " + recetaError.message
            }), { status: 500 });
        }

        // 2. Prepare Ingredients Data
        const ingredientesData = ingredientes.map((ing: any) => ({
            receta_id: receta.id,
            materia_prima_id: ing.materia_prima_id,
            cantidad_necesaria: parseFloat(ing.cantidad_necesaria),
            unidad_medida: ing.unidad_medida
        }));

        // 3. Insert Ingredients
        const { error: ingError } = await supabase
            .from('receta_ingredientes')
            .insert(ingredientesData);

        if (ingError) {
            // Rollback would be ideal here, but Supabase HTTP API doesn't support manual transactions easily.
            // We'd have to delete the recipe. For now, we report the error.
            console.error('Error agregando ingredientes:', ingError);

            // Attempt cleanup
            await supabase.from('recetas').delete().eq('id', receta.id);

            return new Response(JSON.stringify({
                message: "Error al guardar ingredientes. Intenta de nuevo."
            }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Fórmula guardada correctamente"
        }), { status: 200 });

    } catch (error) {
        console.error('Server Error:', error);
        return new Response(JSON.stringify({
            message: "Error interno del servidor"
        }), { status: 500 });
    }
};
