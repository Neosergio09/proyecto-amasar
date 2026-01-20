export interface Product {
    id: string;
    created_at: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock_cantidad: number;
    imagen_url: string | null;
    categoria: string;
    destacado: boolean;
}
