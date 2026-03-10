import Link from "next/link";
import { useGetProductByIdQuery } from "@/services/productApi";
import { CardSkeleton } from "@/components/loading/LoadingSkeleton";

interface Props {
    id: number;
}

export function ProductDetails({ id }: Props) {
    const { data: product, error, isLoading } = useGetProductByIdQuery(id);

    if (isLoading) return <CardSkeleton />;

    if (error)
        return (
            <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-red-700 font-medium'>
                    Could not load product
                </p>
                <p className='text-red-600 text-sm mt-1'>
                    Please try again or go back to the product list.
                </p>
            </div>
        );

    if (!product)
        return (
            <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                <p className='text-yellow-700 font-medium'>Product not found</p>
            </div>
        );

    return (
        <div className='space-y-6'>
            {/* Product Name */}
            <div>
                <h2 className='text-4xl font-bold text-gray-900 mb-2'>
                    {product.name}
                </h2>
            </div>

            {/* Product Info Grid */}
            <div className='grid grid-cols-2 gap-6'>
                <div className='p-4 bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg'>
                    <p className='text-green-600 text-sm font-semibold uppercase tracking-wide'>
                        Price
                    </p>
                    <p className='text-3xl font-bold text-green-900 mt-2'>
                        ৳{product.price.toFixed(2)}
                    </p>
                </div>

                <div className='p-4 bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg'>
                    <p className='text-blue-600 text-sm font-semibold uppercase tracking-wide'>
                        Stock
                    </p>
                    <p
                        className={`text-3xl font-bold mt-2 ${
                            product.stock > 0 ? "text-blue-900" : "text-red-900"
                        }`}>
                        {product.stock} units
                    </p>
                    {product.stock === 0 && (
                        <p className='text-red-600 text-xs mt-2 font-medium'>
                            Out of stock
                        </p>
                    )}
                </div>
            </div>

            {/* Stock Status */}
            <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <p className='text-blue-700 text-sm'>
                    <span className='font-semibold'>Status:</span>{" "}
                    {product.stock > 10
                        ? "✅ In stock (plenty available)"
                        : product.stock > 0
                          ? "⚠️ Low stock (less than 10 units)"
                          : "❌ Out of stock"}
                </p>
            </div>

            {/* Actions */}
            <div className='flex gap-3 pt-4 border-t'>
                <Link
                    href={`/products/${product.id}/edit`}
                    className='inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition'>
                    <span>✏️</span> Edit Product
                </Link>
                <Link
                    href='/products'
                    className='inline-flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition'>
                    <span>←</span> Back to List
                </Link>
            </div>
        </div>
    );
}
