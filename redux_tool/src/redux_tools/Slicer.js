import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 0,
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

}

const addTocart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems: (state, action) => {
            state.value += 1
            console.log(action.payload)
            // state.items.push(action.payload)
            state.items.push({ ...action.payload, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        removeItems: (state, action) => {
            // if (state.value>0) {
            //     state.value-=1
            // }

            // state.value>0? state.value-=1 :null

            const cardData = state.items.filter(item => item.id !== action.payload.id);
            state.items = cardData
            localStorage.setItem('cart', JSON.stringify(cardData))
        },

        IncreseItems: (state, action) => {

            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        decreaseItem: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            
            localStorage.setItem('cart', JSON.stringify(state.items));
            }
        }
    }
})

export const { addItems, removeItems, IncreseItems, decreaseItem } = addTocart.actions
export default addTocart.reducer