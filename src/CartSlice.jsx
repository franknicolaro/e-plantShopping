import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],  // Initialize items as an empty array
    quantityInCart: 0, //Initialize a counter for number of items in cart(I couldnt figure out why items.length wasn't working).
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if(existingItem){
            existingItem.quantity++;
        } else{
            state.items.push({ name, image, cost, quantity: 1});
        }
        state.quantityInCart++;
    },
    removeItem: (state, action) => {
        console.log("removing...")
        state.quantityInCart -= state.items.find(item => item.name === action.payload.name).quantity;
        state.items = state.items.filter(item => item.name !== action.payload.name);
        
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if(existingItem){
            if(existingItem.quantity < quantity){
                state.quantityInCart++;
            }
            else{
                state.quantityInCart--;
            }
            existingItem.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
