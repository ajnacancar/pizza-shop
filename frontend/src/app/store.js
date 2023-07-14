import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../features/pizza/pizzaSlice'
import categoryReduces from '../features/catrgoty-pizza/categorySlice'
import authReducer  from '../features/auth/authSlice'
import basketReducer from '../features/basket/basketSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    pizzas: pizzaReducer,
    categories: categoryReduces,
    auth: authReducer,
    basket: basketReducer,
    order: orderReducer
  },
});
