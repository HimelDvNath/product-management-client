import Link from "next/link";
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from "@/services/productApi";
import { Product } from "@/types/product";
import { useState } from "react";
import { useNotification } from "@/hooks/useNotification";
import { TableLoadingSkeleton } from "@/components/loading/LoadingSkeleton";

export function ProductList() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const {
        data: paginatedData,
        error,
        isLoading,
    } = useGetProductsQuery({ page, limit });
    const [deleteProduct] = useDeleteProductMutation();
    const [deleting, setDeleting] = useState<number | null>(null);
    const { success: showSuccess, error: showError } = useNotification();

    const products = paginatedData?.data || [];
    const totalPages = paginatedData?.pages || 0;

    const handleDelete = async (id: number, productName: string) => {
        if (!confirm(`Are you sure you want to delete "${productName}"?`))
            return;

        try {
            setDeleting(id);
            await deleteProduct(id).unwrap();
            showSuccess(
                "Product deleted!",
                `"${productName}" has been removed.`,
            );
        } catch (err: any) {
            console.error(err);
            showError(
                "Failed to delete product",
                err?.data?.message ||
                    "An error occurred while deleting the product",
            );
        } finally {
            setDeleting(null);
        }
    };

    if (isLoading) return <TableLoadingSkeleton />;
    if (error)
        return (
            <div className='p-6 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-red-700 font-medium'>
                    Error loading products
                </p>
                <p className='text-red-600 text-sm mt-1'>
                    Please try refreshing the page.
                </p>
            </div>
        );

    if (!products || products.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>No products found.</p>
                <Link
                    href='/products/create'
                    className='text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block'>
                    Create your first product →
                </Link>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
                <table className='min-w-full text-sm bg-white'>
                    <thead className='bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
                        <tr>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700'>
                                Name
                            </th>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700'>
                                Price
                            </th>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700'>
                                Stock
                            </th>
                            <th className='px-6 py-4 text-left font-semibold text-gray-700'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-200'>
                        {products.map((p: Product) => (
                            <tr
                                key={p.id}
                                className='hover:bg-blue-50 transition-colors duration-150'>
                                <td className='px-6 py-4 font-medium text-gray-900'>
                                    {p.name}
                                </td>

                                <td className='px-6 py-4 text-gray-600'>
                                    <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold'>
                                        ৳{p.price.toFixed(2)}
                                    </span>
                                </td>

                                <td className='px-6 py-4 text-gray-600'>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            p.stock > 0
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-red-100 text-red-800"
                                        }`}>
                                        {p.stock} units
                                    </span>
                                </td>

                                <td className='px-6 py-4'>
                                    <div className='flex gap-3'>
                                        <Link
                                            href={`/products/${p.id}`}
                                            className='inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium transition'>
                                            <span>👁️</span> View
                                        </Link>

                                        <Link
                                            href={`/products/${p.id}/edit`}
                                            className='inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 hover:underline text-sm font-medium transition'>
                                            <span>✏️</span> Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(p.id, p.name)
                                            }
                                            disabled={deleting === p.id}
                                            className='inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:underline disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition'>
                                            <span>🗑️</span>{" "}
                                            {deleting === p.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary and Pagination */}
            <div className='flex items-center justify-between mt-6'>
                <div className='text-sm text-gray-600'>
                    Showing{" "}
                    <span className='font-semibold text-gray-900'>
                        {products.length}
                    </span>{" "}
                    of{" "}
                    <span className='font-semibold text-gray-900'>
                        {paginatedData?.total || 0}
                    </span>{" "}
                    product{(paginatedData?.total || 0) !== 1 ? "s" : ""}
                </div>

                {totalPages > 1 && (
                    <div className='flex gap-2 items-center'>
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition'>
                            ← Previous
                        </button>

                        <div className='flex gap-1'>
                            {Array.from(
                                { length: Math.min(5, totalPages) },
                                (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - (4 - i);
                                    } else {
                                        pageNum = page - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`px-2 py-1 text-sm rounded transition ${
                                                page === pageNum
                                                    ? "bg-blue-600 text-white"
                                                    : "border border-gray-300 hover:bg-gray-50"
                                            }`}>
                                            {pageNum}
                                        </button>
                                    );
                                },
                            )}
                        </div>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className='px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition'>
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
