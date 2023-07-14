import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [],
  item: {},
  isError: false,
  isSuccess: false,
  message: "",
  basketTotalQuantity: 0,
  basketTotalAmount: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      try {
        if (itemIndex >= 0) {
          state.items[itemIndex] = action.payload;
        } else {
          const tempProduct = {
            ...action.payload,
            cartQuantity: action.payload.quantity,
          };
          state.items.push(tempProduct);
        }
        localStorage.setItem("items", JSON.stringify(state.items));
        toast.success("Pizza added to cart!");
      } catch (error) {
        state.isError = true;
        state.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        toast.error(state.message);
      }
    },

    removeItemFromCart(state, action){
      try {
        const cartItems =  state.items.filter(
          item => item.id !== action.payload.id
        )

        state.items = cartItems

        localStorage.setItem('items', JSON.stringify(state.items))

        toast.info("Item removed from cart")
      } catch (error) {
        state.isError = true;
        state.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          toast.error(state.message);

      }
    
    },

    clearCart(state, action){

      try {
        state.items = []
        localStorage.removeItem('items')

        toast.info("Cart cleared!")
      } catch (error) {
        state.isError = true;
        state.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          toast.error(state.message);
      }
        
    },

    getTotal(state, action){
   let {total, quantity} = state.items.reduce((cartTotal, cartItem)=>{
        const {pizzaPrice, cartQuantity} = cartItem;
        
        cartTotal.total += parseFloat(pizzaPrice)
        cartTotal.quantity += cartQuantity

        return cartTotal
      }, {
        total: 0,
        quantity: 0
      })


      state.basketTotalQuantity = quantity;
      state.basketTotalAmount = total
    }
  },
  extraReducers: (builder) => {},
});
export const { addToCart, removeItemFromCart, clearCart, getTotal } = basketSlice.actions;
export default basketSlice.reducer;
