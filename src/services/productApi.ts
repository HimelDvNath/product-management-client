import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    Product,
    CreateProduct,
    UpdateProduct,
    PaginatedProducts,
} from "@/types/product";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query<
            PaginatedProducts,
            { page?: number; limit?: number }
        >({
            query: ({ page = 1, limit = 10 }) =>
                `/products?page=${page}&limit=${limit}`,
            transformResponse: (response: PaginatedProducts) => ({
                ...response,
                data: response.data.map((product) => ({
                    ...product,
                    price: Number(product.price),
                    stock: Number(product.stock),
                })),
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: "Products" as const,
                              id,
                          })),
                          { type: "Products", id: "LIST" },
                      ]
                    : [{ type: "Products", id: "LIST" }],
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            transformResponse: (response: { data: Product }) => ({
                ...response.data,
                price: Number(response.data.price),
                stock: Number(response.data.stock),
            }),
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
        createProduct: builder.mutation<Product, CreateProduct>({
            query: (body) => ({
                url: "/products",
                method: "POST",
                body,
            }),
            transformResponse: (response: { data: Product }) => ({
                ...response.data,
                price: Number(response.data.price),
                stock: Number(response.data.stock),
            }),
            invalidatesTags: [{ type: "Products", id: "LIST" }],
        }),
        updateProduct: builder.mutation<
            Product,
            UpdateProduct & { id: number }
        >({
            query: ({ id, ...patch }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: patch,
            }),
            transformResponse: (response: { data: Product }) => ({
                ...response.data,
                price: Number(response.data.price),
                stock: Number(response.data.stock),
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Products", id },
                { type: "Products", id: "LIST" },
            ],
        }),
        deleteProduct: builder.mutation<
            { success: boolean; message: string },
            number
        >({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Products", id },
                { type: "Products", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
