import Link from "next/link";
import { ProductList } from "@/features/products/ProductList";

export default function ProductsPage() {
    return (
        <main className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Header Section */}
                <div className='mb-10'>
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8'>
                        <div>
                            <div className='flex items-center gap-3 mb-3'>
                                <span className='text-4xl'>📦</span>
                                <h1 className='text-5xl font-black text-slate-900'>
                                    Products
                                </h1>
                            </div>
                            <p className='text-slate-600 text-lg'>
                                Manage and track all your products inventory in
                                one place.
                            </p>
                        </div>

                        <Link
                            href='/products/create'
                            className='px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap'>
                            + New Product
                        </Link>
                    </div>
                </div>

                {/* Product Table Card */}
                <div className='bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden'>
                    <div className='p-8'>
                        <ProductList />
                    </div>
                </div>

                
            </div>
        </main>
    );
}
