import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../slices/productsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    }
})

// Definisci i tipi per lo stato e i dispatcher di Redux
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;