import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  task: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Goal

export const createTask = createAsyncThunk(
  "goals/create",
  async (taskData, thunkApi) => {
    try
    {

      return await taskService.createTask(taskData);
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

// Get User Goals

export const getTasks = createAsyncThunk(
  "task/getall",
  async (_, thunkApi) => {
      try {
      const token = thunkApi.getState().auth.user.token;
      const data = await taskService.getAllTasks(token);
      return data;
    } catch (err) {
      const message =
        (err.message && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);


export const expiredChecker = createAsyncThunk("expired/checker", async (_, thunkApi) => { 
    try {
    const data = await taskService.expiredChecker();
    return data;
  } catch (err) {
    const message =
      (err.message && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkApi.rejectWithValue(message);
  }
})


export const updateTaskStatus = createAsyncThunk("task/updateStatus", async ({ id, status }, thunkApi) => { 
  try {

    const data = await taskService.updateTaskStatus(id, status);
    return data;
  } catch (err) {
    const message =
      (err.message && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkApi.rejectWithValue(message);
  }
})


export const getUserTasks = createAsyncThunk("task/user", async (_, thunkApi) => { 
  try {

    const data = await taskService.getUserTasks();
    return data;
  } catch (err) {
    const message =
      (err.message && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkApi.rejectWithValue(message);
  }
})

// Create goal slice
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
      })
      .addCase(getUserTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  
  },
});

 
export const { reset } = taskSlice.actions;
export default taskSlice.reducer;