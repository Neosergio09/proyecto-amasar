export interface Product {
    id: string;
    created_at: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock_cantidad: number;
    imagen_url: string | null;
    categoria: 'Galletas' | 'Café' | 'Chocolatería' | 'Jugos' | 'Gelatina' | string;
    destacado: boolean;
}

export interface Client {
    id: number; // BigInt Identity
    created_at?: string;
    nombre_comercial: string;
    direccion?: string;
    vendedor_id?: string; // UUID
    // Optional legacy/helper fields
    telefono?: string;
    email?: string;
}

export interface Order {
    id: string;
    created_at: string;
    cliente_nombre: string;
    cliente_id?: string; // Optional for backward compatibility or direct sales
    detalles: any; // JSONB
    total: number;
    estado: string;
    tag_rastreo: string;
}
