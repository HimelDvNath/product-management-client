import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@/services/productApi";

export const store = configureStore({
    reducer: {
        // RTK Query mounted reducer
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
