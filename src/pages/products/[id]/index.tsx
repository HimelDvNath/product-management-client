import { useRouter } from "next/router";
import Link from "next/link";
import { ProductDetails } from "@/features/products/ProductDetails";

export default function ViewProductPage() {
    const router = useRouter();
    const { id } = router.query;

    if (!id || Array.isArray(id)) {
        return (
            <main className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6'>
                <div className='text-center'>
                    <p className='text-red-600 font-semibold text-lg mb-4'>
                        Invalid product ID
                    </p>
                    <Link
                        href='/products'
                        className='text-blue-600 hover:text-blue-700 font-medium'>
                        ← Back to products
                    </Link>
                </div>
            </main>
        );
    }

    const numericId = parseInt(id, 10);

    return (
        <main className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-4xl mx-auto'>
                {/* Back button */}
                <Link
                    href='/products'
                    className='text-blue-600 hover:text-blue-700 text-sm font-medium mb-6 inline-flex items-center gap-2 transition'>
                    <span>←</span> Back to Products
                </Link>

                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                        Product Details
                    </h1>
                    <p className='text-gray-600 text-base'>
                        📋 View detailed information about this product.
                    </p>
                </div>

                {/* Product Details Card */}
                <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-8'>
                    <ProductDetails id={numericId} />
                </div>
            </div>
        </main>
    );
}
