import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
    categories: [],
    category: {},
    isError: false,
    isSuccess: false,
    message: ''
}


//GET ALL CATEGORIES
export const getAllCategories = createAsyncThunk(
    'categories', 
    async (_, thunkAPI) => {
        try {
            return await categoryService.getAllCategories();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data. message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) =>{
        builder
        
        .addCase(getAllCategories.fulfilled, (state, action) => {
            state.isSuccess = true
            state.categories = action.payload
        })
        .addCase(getAllCategories.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
       
    }
})


export const {reset} = categorySlice.actions
export default categorySlice.reducer