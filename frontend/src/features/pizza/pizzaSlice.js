import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pizzaService from "./pizzaService";
import { ADMIN_DATA } from "../../data/static_data";

const initialState = {
  pizzas: [],
  pizza: {},
  isError: null,
  isSuccess: null,
  pizzaCrudSuccess: null,
  pizzaCrudError: null,
  message: "",
};

//GET PIZZAS BY CATEGORY
export const getAllPizzasByCategory = createAsyncThunk(
  "category",
  async (category, thunkAPI) => {
    try {
      return await pizzaService.getPizzasByCategory(category);
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

//GET SINGLE PIZZA
export const getSinglePizza = createAsyncThunk(
  "pizza",
  async (pizzaId, thunkAPI) => {
    try {
      return await pizzaService.getSinglePizza(pizzaId);
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

//CREATE NEW PIZZA
export const createPizza = createAsyncThunk(
  "addPizza",
  async (pizzaData, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;
      return pizzaService.createPizza(pizzaData, token);
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

// SEARCH PIZZA
export const searchPizza = createAsyncThunk(
  "search",
  async (term, thunkAPI) => {
    try {
      return pizzaService.searchPizza(term);
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

//GET LATEST
export const getLatest = createAsyncThunk("getLatest", async (_, thunkAPI) => {
  try {
    return pizzaService.getLatest();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//SET RATING
export const setRating = createAsyncThunk(
  "setRating",
  async (data, thunkAPI) => {
    try {
      return await pizzaService.setRating(data);
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

//UPDATE PIZZA
export const updatePizza = createAsyncThunk(
  "update",
  async (pizzaData, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;

      return pizzaService.updatePizza(pizzaData, token);
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

//DELETE PIZZA
export const deletePizza = createAsyncThunk(
  "pizza/:id",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;
      return pizzaService.deletePizza(id, token);
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

export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPizza.fulfilled, (state) => {
        state.pizzaCrudSuccess = true;
        state.pizzaCrudError = false;
      })
      .addCase(createPizza.rejected, (state, action) => {
        state.pizzaCrudError = true;
        state.pizzaCrudSuccess = false;
        state.message = action.payload;
      })
      .addCase(updatePizza.fulfilled, (state) => {
        state.pizzaCrudSuccess = true;
        state.pizzaCrudError = false;
      })
      .addCase(updatePizza.rejected, (state, action) => {
        state.pizzaCrudError = true;
        state.pizzaCrudSuccess = false;
        state.message = action.payload;
      })
      .addCase(deletePizza.fulfilled, (state) => {
        state.pizzaCrudSuccess = true;
        state.pizzaCrudError = false;
      })
      .addCase(deletePizza.rejected, (state, action) => {
        state.pizzaCrudError = true;
        state.pizzaCrudSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAllPizzasByCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.pizzas = action.payload;
      })
      .addCase(getAllPizzasByCategory.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSinglePizza.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.pizza = action.payload;
      })
      .addCase(getSinglePizza.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchPizza.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.pizzas = action.payload;
      })
      .addCase(searchPizza.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLatest.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.pizzas = action.payload;
      })
      .addCase(getLatest.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setRating.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(setRating.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = pizzaSlice.actions;

export default pizzaSlice.reducer;
