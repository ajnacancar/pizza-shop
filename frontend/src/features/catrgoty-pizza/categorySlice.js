import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
import { ADMIN_DATA } from "../../data/static_data";

const initialState = {
  categories: [],
  category: {},
  isError: false,
  isSuccess: false,
  categoryCrudError: false,
  categoryCrudSuccess: false,
  message: "",
};

//GET ALL CATEGORIES
export const getAllCategories = createAsyncThunk(
  "categories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getAllCategories();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//CREATE NEW CATEGORY
export const createCategory = createAsyncThunk(
  "createCategory",
  async (data, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;

      return await categoryService.createCategory(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//UPDATE CATEGORY
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (data, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;
      return await categoryService.updateCategory(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//DELETE CATEGORY
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;
      return await categoryService.deleteCategory(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoryCrudSuccess = true;
        state.categories = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.categoryCrudError = true;
        state.message = action.payload;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoryCrudSuccess = true;
        state.categories = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.categoryCrudError = true;
        state.message = action.payload;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryCrudSuccess = true;
        state.categories = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.categoryCrudError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
