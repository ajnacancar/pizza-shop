import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import pizzaService from './pizzaService'

const initialState = {
    pizzas: [],
    pizza: {},
    isError: false,
    isSuccess: false,
    message: ''
}

//GET PIZZAS BY CATEGORY
export const getAllPizzasByCategory = createAsyncThunk(
    'category', 
    async (category, thunkAPI) => {
        try {
            return await pizzaService.getPizzasByCategory(category);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//GET SINGLE PIZZA
export const getSinglePizza = createAsyncThunk(
    'pizza',
    async(pizzaId, thunkAPI) => {
        try {
            return await pizzaService.getSinglePizza(pizzaId);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//CREATE NEW PIZZA
export const createPizza = createAsyncThunk(
    'addPizza',
    async (pizzaData, thunkAPI) =>{
        try {
            return pizzaService.createPizza(pizzaData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// SEARCH PIZZA
export const searchPizza = createAsyncThunk(
    'search',
    async (term, thunkAPI) => {
        try {
            return pizzaService.searchPizza(term);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//GET LATEST
export const getLatest = createAsyncThunk(
    'getLatest',
    async (_, thunkAPI) => {
        try {
            return pizzaService.getLatest();
            
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//SET RATING
export const setRating = createAsyncThunk(
    'setRating',
    async (data, thunkAPI) =>{
        try {
            return await pizzaService.setRating(data)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) =>{
        builder
        .addCase(createPizza.fulfilled, (state)=>{
            state.isSuccess = true
            state.isError = false
        })
         .addCase(createPizza.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
         })
        .addCase(getAllPizzasByCategory.fulfilled, (state, action) => {
            state.isSuccess = true
            state.pizzas = action.payload
        })
        .addCase(getAllPizzasByCategory.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(getSinglePizza.fulfilled, (state, action) => {
            state.isSuccess = true
            state.pizza = action.payload
        })
        .addCase(getSinglePizza.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(searchPizza.fulfilled, (state, action) => {
            state.isSuccess = true
            state.pizzas = action.payload
        })
        .addCase(searchPizza.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(getLatest.fulfilled, (state, action) => {
            state.isSuccess = true
            state.pizzas = action.payload
        })
        .addCase(getLatest.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(setRating.fulfilled, (state, action) => {
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(setRating.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
       
    }
})

export const {reset} = pizzaSlice.actions


export default pizzaSlice.reducer