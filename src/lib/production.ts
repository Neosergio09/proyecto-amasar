import { supabase } from './supabase';

interface ProductionResult {
    success: boolean;
    message: string;
}

/**
 * Execute a production order for a given product and quantity.
 * This function calls a secure PostgreSQL RPC function to ensure transactional integrity.
 * It will validate stock levels for all ingredients before making any updates.
 * 
 * @param productoId - The UUID of the product being produced.
 * @param cantidadAProducir - The quantity to produce.
 * @returns ProductionResult object with success status and message.
 */
export async function executeProductionOrder(productoId: string, cantidadAProducir: number): Promise<ProductionResult> {
    try {
        const { data, error } = await supabase.rpc('execute_production_order', {
            p_producto_id: productoId,
            p_cantidad_a_producir: cantidadAProducir
        });

        if (error) {
            console.error('RPC Error:', error);
            return { success: false, message: error.message };
        }

        return data as ProductionResult;

    } catch (err: any) {
        console.error('Execution Error:', err);
        return { success: false, message: err.message || 'Unknown error occurred' };
    }
}
