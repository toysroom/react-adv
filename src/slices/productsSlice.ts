import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import { RootState } from "../app/store";
import { Status } from "../models/Status";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    // action products/fetchProducts/pending
    'products/fetchProducts',
    async () => {
        const url = 'http://localhost:3000/products';
        try {
            const response = await axios.get(url);
            return response.data; // products/fetchProducts/fulfilled + payload(response.data)
        }
        catch (e) {
            // products/fetchProducts/rejected payload
            throw new Error('Errore nella fecth');
        }
    }
) 

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (body: Partial<Product>) => {
        const url = 'http://localhost:3000/products';
        try {
            const response = await axios.post(url, body);
            return response.data;
        }
        catch (e) {
            throw new Error('Errore nella aggiunta');
        }
    }
) 

export const updProduct = createAsyncThunk(
    'products/updProduct',
    async (body: Partial<Product>) => {
        const url = 'http://localhost:3000/products/'+body.id;
        try {
            const response = await axios.put(url, body);
            return response.data;
        }
        catch (e) {
            throw new Error('Errore nella modifica');
        }
    }
) 

export const delProduct = createAsyncThunk(
    'products/delProduct',
    async (el: Product) => {
        const url = 'http://localhost:3000/products/'+el.id;
        try {
            await axios.delete(url);
            return el;
        }
        catch (e) {
            throw new Error('Errore nella cancellazione');
        }
    }
) 


export interface ProductsState {
    data: Product[],
    status: Status.empty | Status.loading | Status.fulfilled | Status.rejected | Status.idle,
    errors: string;
    insert: Status.idle | Status.fulfilled | Status.rejected;
    update: Status.idle | Status.fulfilled | Status.rejected;
    destroy: Status.idle | Status.loading | Status.fulfilled | Status.rejected;
    errorsModal: string;
}

const initialState: ProductsState = {
    data: [],
    status: Status.idle,
    errors: '',
    insert: Status.idle,
    update: Status.idle,
    destroy: Status.idle,
    errorsModal: '',
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: { 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = Status.loading;
                state.errors = '';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload.map( (el: any) => ({...el, destroy: Status.idle }));
                state.status = state.data.length ? Status.fulfilled : Status.empty;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = Status.rejected;
                state.errors = action.error.message || 'Errore generico';
            })

            .addCase(addProduct.pending, (state) => {
                state.insert = Status.idle;
                state.errorsModal = '';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.data = [...state.data, action.payload];
                state.insert = Status.fulfilled;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.errorsModal = action.error.message || 'Errore generico';
            })

            .addCase(updProduct.pending, (state) => {
                state.update = Status.idle;
                state.errorsModal = '';
            })
            .addCase(updProduct.fulfilled, (state, action) => {
                state.data = state.data.map(el => (el.id === action.payload.id) ? action.payload : el);
                state.update = Status.fulfilled;
            })
            .addCase(updProduct.rejected, (state, action) => {
                state.errorsModal = action.error.message || 'Errore generico';
            })

            .addCase(delProduct.pending, (state, action) => {
                state.destroy = Status.idle;
                state.data = state.data.map( el => el.id === action.meta.arg.id ? {...el, destroy: Status.loading} : el);
            })
            .addCase(delProduct.fulfilled, (state, action) => {
                state.data = state.data.filter( el => el.id !== action.payload.id);
                state.destroy = Status.fulfilled;
            })
            .addCase(delProduct.rejected, (state) => {
                state.destroy = Status.rejected;
            })
    }
});

// selectors
export const selectAllProducts = (state: RootState) => state.products;

export default productsSlice.reducer;