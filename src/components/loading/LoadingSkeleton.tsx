export function TableLoadingSkeleton() {
    return (
        <div className='space-y-3'>
            {[...Array(5)].map((_, i) => (
                <div key={i} className='flex gap-4'>
                    <div className='h-12 bg-gray-200 rounded flex-1 animate-pulse' />
                    <div className='h-12 bg-gray-200 rounded flex-1 animate-pulse' />
                    <div className='h-12 bg-gray-200 rounded flex-1 animate-pulse' />
                    <div className='h-12 bg-gray-200 rounded w-32 animate-pulse' />
                </div>
            ))}
        </div>
    );
}

export function FormLoadingButton() {
    return <div className='h-10 bg-gray-200 rounded animate-pulse' />;
}

export function CardSkeleton() {
    return (
        <div className='space-y-4'>
            <div className='h-8 bg-gray-200 rounded w-1/2 animate-pulse' />
            <div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
            <div className='h-4 bg-gray-200 rounded w-5/6 animate-pulse' />
        </div>
    );
}
