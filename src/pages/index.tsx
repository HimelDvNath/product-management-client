import Link from "next/link";

export default function Home() {
    return (
        <main className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6 py-12'>
            <div className='max-w-5xl w-full'>
                {/* Main Content */}
                <div className='text-center mb-16'>
                    {/* Badge */}
                    <div className='inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-blue-300 bg-blue-500/20 border border-blue-500/50 rounded-full backdrop-blur-sm'>
                        <span className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></span>
                        Product Management System
                    </div>

                    {/* Heading */}
                    <h1 className='text-6xl md:text-7xl font-black text-white mb-6 leading-tight'>
                        Manage Your
                        <span className='block bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent'>
                            Product Inventory
                        </span>
                    </h1>

                    {/* Description */}
                    <p className='text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed'>
                        A powerful, intuitive platform to manage, track, and
                        organize all your products in one place. Built for
                        efficiency and ease of use.
                    </p>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row justify-center gap-4 mb-16'>
                        <Link
                            href='/products'
                            className='px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition transform hover:scale-105 shadow-lg hover:shadow-xl'>
                            → View Products
                        </Link>

                        <Link
                            href='/products/create'
                            className='px-8 py-4 border-2 border-blue-400 text-blue-300 rounded-lg font-bold text-lg hover:bg-blue-500/10 transition transform hover:scale-105 backdrop-blur-sm'>
                            + Add Product
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-blue-400/50 transition group'>
                        <div className='text-4xl mb-4 transform group-hover:scale-125 transition'>
                            📦
                        </div>
                        <h3 className='font-bold text-xl text-white mb-3'>
                            Easy Management
                        </h3>
                        <p className='text-slate-300 text-sm leading-relaxed'>
                            Add, edit, and organize products with a simple and
                            intuitive interface.
                        </p>
                    </div>

                    <div className='p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-cyan-400/50 transition group'>
                        <div className='text-4xl mb-4 transform group-hover:scale-125 transition'>
                            📊
                        </div>
                        <h3 className='font-bold text-xl text-white mb-3'>
                            Inventory Tracking
                        </h3>
                        <p className='text-slate-300 text-sm leading-relaxed'>
                            Keep track of product stock and availability in real
                            time.
                        </p>
                    </div>

                    <div className='p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-indigo-400/50 transition group'>
                        <div className='text-4xl mb-4 transform group-hover:scale-125 transition'>
                            ⚡
                        </div>
                        <h3 className='font-bold text-xl text-white mb-3'>
                            Fast Performance
                        </h3>
                        <p className='text-slate-300 text-sm leading-relaxed'>
                            Built with Next.js for fast loading and smooth user
                            experience.
                        </p>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className='text-center text-slate-400 text-sm'>
                    <p>
                        Ready to organize your inventory? Start managing your
                        products now →
                    </p>
                </div>
            </div>
        </main>
    );
}
