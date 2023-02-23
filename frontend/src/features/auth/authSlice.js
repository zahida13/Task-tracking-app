import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// GetUser From Localstorage
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user:  !user ? null : user,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
    const token = thunkApi.getState().auth.user.token;

      return await authService.register(token, userData);
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

// Login User

export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message =
      (err.message && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkApi.rejectWithValue(message);
  }
});


export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (_, thunkApi) => { 
  try {
    const token = thunkApi.getState().auth.user.token;
    return await authService.getAllUser(token);
  } catch (err) {
    const message =
      (err.message && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkApi.rejectWithValue(message);
  }
})

export const disableUsers = createAsyncThunk("auth/disable", async (data, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token;
    return await authService.disableUser(token, data);
  } catch (err) {
    const message =
      (err.message && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkApi.rejectWithValue(message);
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.push(actions.payload);
      })
      .addCase(register.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.users = null;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = actions.payload
      })
      .addCase(getAllUsers.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.users = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(login.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(disableUsers.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.filter((user) => user._id === actions.payload._id );
      })
      .addCase(disableUsers.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      })
      .addCase(disableUsers.pending, (state, actions) => {
        state.isLoading = true;
 
      })
   },
});

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logOUt();
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;