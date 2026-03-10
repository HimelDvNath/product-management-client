import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCreateProductMutation } from "@/services/productApi";
import { ProductForm } from "@/features/products/ProductForm";
import { useNotification } from "@/hooks/useNotification";

export default function CreateProductPage() {
    const [createProduct, { isLoading, error }] = useCreateProductMutation();
    const router = useRouter();
    const { success: showSuccess, error: showError } = useNotification();

    const handleSubmit = async (data: any) => {
        try {
            await createProduct(data).unwrap();
            showSuccess(
                "Product created!",
                "Product has been added successfully.",
            );
            setTimeout(() => {
                router.push("/products");
            }, 1500);
        } catch (err: any) {
            console.error(err);
            showError(
                "Failed to create product",
                err?.data?.message ||
                    "An error occurred while creating the product",
            );
        }
    };

    useEffect(() => {
        if (error && error !== undefined) {
            showError(
                "Error",
                typeof error === "string" ? error : "An error occurred",
            );
        }
    }, [error, showError]);

    return (
        <main className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-6'>
            <div className='max-w-2xl mx-auto'>
                {/* Back Button */}
                <Link
                    href='/products'
                    className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-bold mb-8 transition hover:gap-3'>
                    ← Back to Products
                </Link>

                {/* Header */}
                <div className='mb-10'>
                    <div className='flex items-center gap-3 mb-3'>
                        <span className='text-4xl'>✨</span>
                        <h1 className='text-5xl font-black text-slate-900'>
                            Create Product
                        </h1>
                    </div>
                    <p className='text-slate-600 text-lg'>
                        Add a new product to your inventory. Fill in the details
                        below.
                    </p>
                </div>

                {/* Form Card */}
                <div className='bg-white rounded-2xl shadow-xl border border-slate-200 p-10 mb-6'>
                    <ProductForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        submitLabel='Create Product'
                    />
                </div>

                {/* Info Note */}
                <div className='p-5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-xl flex items-start gap-3 shadow-md'>
                    <span className='text-2xl flex-shrink-0'>💡</span>
                    <p className='text-blue-900 text-sm font-medium line-height: 1.6'>
                        After creating a product, you will be automatically
                        redirected to the product list.
                    </p>
                </div>
            </div>
        </main>
    );
}
