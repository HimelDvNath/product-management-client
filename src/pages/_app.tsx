import { Navbar } from "@/components/navbar1";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Toaster
                position='top-right'
                theme='light'
                richColors
                closeButton
                expand
            />
            <Navbar />
            <Component {...pageProps} />
        </Provider>
    );
}
