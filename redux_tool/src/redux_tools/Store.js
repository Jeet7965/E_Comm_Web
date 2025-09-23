import { configureStore, } from "@reduxjs/toolkit";
import CartReducer from './Slicer.js'
import productReducer from './ProductApi.js'
const store = configureStore({
    reducer: {
        cart: CartReducer,
        products:productReducer,
    }
})

export default store