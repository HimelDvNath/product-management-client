import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProductForm } from "@/features/products/ProductForm";
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "@/services/productApi";
import { useNotification } from "@/hooks/useNotification";
import { CardSkeleton } from "@/components/loading/LoadingSkeleton";

export default function EditProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const numericId = typeof id === "string" ? parseInt(id, 10) : undefined;

    const { success: showSuccess, error: showError } = useNotification();

    const {
        data: product,
        error,
        isLoading,
    } = useGetProductByIdQuery(numericId as number, {
        skip: numericId === undefined,
    });

    const [updateProduct, { isLoading: isUpdating }] =
        useUpdateProductMutation();

    const handleSubmit = async (data: any) => {
        try {
            await updateProduct({ id: numericId, ...data }).unwrap();
            showSuccess(
                "Product updated!",
                "Changes have been saved successfully.",
            );
            setTimeout(() => router.push("/products"), 1500);
        } catch (err: any) {
            console.error(err);
            showError(
                "Failed to update product",
                err?.data?.message ||
                    "An error occurred while updating the product",
            );
        }
    };

    // Notify on fetch error
    useEffect(() => {
        if (error) {
            showError(
                "Error loading product",
                "Could not fetch product details",
            );
        }
    }, [error, showError]);

    // Loading State
    if (isLoading)
        return (
            <main className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center'>
                <div className='max-w-2xl w-full'>
                    <CardSkeleton />
                </div>
            </main>
        );

    // Error / Not Found States
    if (error || !product)
        return (
            <main className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center'>
                <div className='text-center'>
                    <p className='text-red-600 font-bold text-lg mb-4'>
                        {error ? "Error loading product" : "Product not found"}
                    </p>
                    <Link
                        href='/products'
                        className='text-blue-600 hover:text-blue-700 font-medium'>
                        ← Back to products
                    </Link>
                </div>
            </main>
        );

    // Main Form UI
    return (
        <main className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-2xl mx-auto'>
                {/* Back Button */}
                <Link
                    href='/products'
                    className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6'>
                    <span>←</span> Back to Products
                </Link>

                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-4xl font-extrabold text-gray-900'>
                        Edit Product
                    </h1>
                    <p className='text-gray-600 mt-2'>
                        Update{" "}
                        <span className='font-semibold text-gray-900'>
                            "{product.name}"
                        </span>{" "}
                        details below.
                    </p>
                </div>

                {/* Form Card */}
                <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-8'>
                    <ProductForm
                        initialData={product}
                        onSubmit={handleSubmit}
                        isLoading={isUpdating}
                        submitLabel='Update Product'
                    />
                </div>

                {/* Info / Note */}
                <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2'>
                    <span className='text-blue-600 text-xl'>💡</span>
                    <p className='text-blue-800 text-sm'>
                        Your changes will be saved and you will be redirected to
                        the product list automatically.
                    </p>
                </div>
            </div>
        </main>
    );
}
