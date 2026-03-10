export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export interface CreateProduct {
    name: string;
    price: number;
    stock: number;
}

export interface UpdateProduct {
    id: number;
    name?: string;
    price?: number;
    stock?: number;
}

export interface PaginatedProducts {
    data: Product[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}
