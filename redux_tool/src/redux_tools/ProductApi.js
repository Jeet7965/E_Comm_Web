import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct=createAsyncThunk('products',async()=>{
   const resp=await fetch('https://fakestoreapi.com/products')
 const jsonresp=await resp.json();
 return jsonresp

})



const initialState={
    items:[],
    status:undefined,
    error:null
}


const productSlice =createSlice({
    name:'productSlice',
    initialState,
    extraReducers: (builder)=> {
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            state.status="Succeeded"
            state.items=action.payload
        })
    }
})



export default productSlice.reducer
