import { FormEvent, useEffect, useState } from "react";
import type { Product, CreateProduct, UpdateProduct } from "@/types/product";
import { useNotification } from "@/hooks/useNotification";

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSubmit: (data: any) => void;
    submitLabel?: string;
    isLoading?: boolean;
    error?: React.ReactNode;
}

export function ProductForm({
    initialData = {},
    onSubmit,
    submitLabel = "Save",
    isLoading = false,
    error,
}: ProductFormProps) {
    const [name, setName] = useState(initialData.name || "");
    const [price, setPrice] = useState(initialData.price?.toString() || "");
    const [stock, setStock] = useState(initialData.stock?.toString() || "");
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string>
    >({});
    const { error: showError } = useNotification();

    useEffect(() => {
        if (initialData.name) setName(initialData.name);
        if (initialData.price !== undefined)
            setPrice(initialData.price.toString());
        if (initialData.stock !== undefined)
            setStock(initialData.stock.toString());
    }, [initialData]);

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!name.trim()) errors.name = "Name is required";
        if (!price || isNaN(parseFloat(price)))
            errors.price = "Valid price is required";
        if (!stock || isNaN(parseInt(stock, 10)))
            errors.stock = "Valid stock is required";
        return errors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setValidationErrors({});

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            showError("Validation Error", "Please fix all fields");
            return;
        }

        const payload: any = {
            name: name.trim(),
            price: parseFloat(price),
            stock: parseInt(stock, 10),
        };

        if (initialData.id) payload.id = initialData.id;
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Product Name Field */}
            <div className='space-y-3'>
                <label className='flex items-center gap-2 text-lg font-bold text-slate-800'>
                    <span className='text-2xl'>📦</span>
                    Product Name
                </label>
                <div className='relative'>
                    <input
                        type='text'
                        className={`w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white ${
                            validationErrors.name
                                ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                                : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                        }`}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (validationErrors.name) {
                                setValidationErrors({
                                    ...validationErrors,
                                    name: "",
                                });
                            }
                        }}
                        placeholder='Enter product name...'
                        disabled={isLoading}
                    />
                    {validationErrors.name && (
                        <div className='absolute -bottom-6 left-0 flex items-center gap-1 text-red-600 text-sm font-medium'>
                            <span className='text-lg'>⚠️</span>
                            {validationErrors.name}
                        </div>
                    )}
                </div>
            </div>

            {/* Price and Stock Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Price Field */}
                <div className='space-y-3'>
                    <label className='flex items-center gap-2 text-lg font-bold text-slate-800'>
                        <span className='text-2xl'>💰</span>
                        Price
                    </label>
                    <div className='relative'>
                        <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold text-lg'>
                            ৳
                        </div>
                        <input
                            type='number'
                            step='0.01'
                            min='0'
                            className={`w-full pl-8 pr-5 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white ${
                                validationErrors.price
                                    ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                                    : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                            }`}
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                if (validationErrors.price) {
                                    setValidationErrors({
                                        ...validationErrors,
                                        price: "",
                                    });
                                }
                            }}
                            placeholder='0.00'
                            disabled={isLoading}
                        />
                        {validationErrors.price && (
                            <div className='absolute -bottom-6 left-0 flex items-center gap-1 text-red-600 text-sm font-medium'>
                                <span className='text-lg'>⚠️</span>
                                {validationErrors.price}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stock Field */}
                <div className='space-y-3'>
                    <label className='flex items-center gap-2 text-lg font-bold text-slate-800'>
                        <span className='text-2xl'>📊</span>
                        Stock Quantity
                    </label>
                    <div className='relative'>
                        <input
                            type='number'
                            min='0'
                            className={`w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white ${
                                validationErrors.stock
                                    ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                                    : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                            }`}
                            value={stock}
                            onChange={(e) => {
                                setStock(e.target.value);
                                if (validationErrors.stock) {
                                    setValidationErrors({
                                        ...validationErrors,
                                        stock: "",
                                    });
                                }
                            }}
                            placeholder='0'
                            disabled={isLoading}
                        />
                        <div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold'>
                            units
                        </div>
                        {validationErrors.stock && (
                            <div className='absolute -bottom-6 left-0 flex items-center gap-1 text-red-600 text-sm font-medium'>
                                <span className='text-lg'>⚠️</span>
                                {validationErrors.stock}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className='p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl flex items-start gap-3'>
                    <span className='text-2xl flex-shrink-0'>❌</span>
                    <div>
                        <p className='text-red-800 font-semibold text-sm'>
                            Error
                        </p>
                        <p className='text-red-700 text-sm mt-1'>{error}</p>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-200 transform ${
                    isLoading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-105 shadow-lg hover:shadow-xl"
                } flex items-center justify-center gap-3`}>
                {isLoading && (
                    <svg
                        className='animate-spin h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'>
                        <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                        />
                        <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                    </svg>
                )}
                {!isLoading && <span className='text-2xl'>✨</span>}
                {isLoading ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}
