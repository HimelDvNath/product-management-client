import { toast } from "sonner";

export const useNotification = () => {
    const success = (message: string, description?: string) => {
        toast.success(message, {
            description,
            duration: 3000,
        });
    };

    const error = (message: string, description?: string) => {
        toast.error(message, {
            description,
            duration: 4000,
        });
    };

    const loading = (message: string) => {
        return toast.loading(message);
    };

    const promise = <T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string;
            error: string;
        },
    ) => {
        return toast.promise(promise, messages);
    };

    const dismiss = (toastId?: string | number) => {
        toast.dismiss(toastId);
    };

    return { success, error, loading, promise, dismiss };
};
