import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/Api";


const initialState = {
  isLogged: false,
  token:""
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data, thunkAPI) => {
    try {
      const response = await Api.post("user/login", data);
      return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, thunkAPI) => {
    try {
      const response = await Api.post("/user/signup", data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout:(state, action) => {
        state.isLogged = false;
        state.token = "";
      }
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log("action.payload.token",action.payload.token)
            state.isLogged = true;
            state.token = action.payload.token;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLogged = true;
            state.token = action.payload.token;
        })
        
    },
  });
  
  export const {  logout } = authSlice.actions;
  
  export default authSlice.reducer;
  