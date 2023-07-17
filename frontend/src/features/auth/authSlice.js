import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { ADMIN_DATA, USER_DATA } from "../../data/static_data";

// GET USER FROM LOCAL STORAGE
const user = localStorage.getItem(USER_DATA)
  ? JSON.parse(localStorage.getItem(USER_DATA))
  : null;

const admin = localStorage.getItem(ADMIN_DATA)
  ? JSON.parse(localStorage.getItem(USER_DATA))
  : null;

const initialState = {
  user: user && user.id ? user : null,
  admin: admin && admin.id ? admin : null,
  isError: null,
  isSuccess: null,
  message: "",
  isLoading: false,
};

//REGISTER NEW USER
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

//LOGIN USER
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//LOGIN USER
export const loginAdmin = createAsyncThunk(
  "auth/login-admin",
  async (user, thunkAPI) => {
    try {
      return await authService.loginAdmin(user);
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

//LOGOUT USER
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.admin = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
