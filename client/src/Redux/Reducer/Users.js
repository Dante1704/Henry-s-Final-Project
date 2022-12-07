import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  adminUser: [],
  loading: false,
  error: "",
};

export const getAllusers = createAsyncThunk(
  "getAllusers/getAllusers",
  async () => {
    return await fetch(`http://localhost:3001/user/allUsers`).then((response) =>
      response.json()
    );
  }
);

export const updateUser = createAsyncThunk(
  "updateUser/updateUser",
  async (id, input) => {
    console.log(id);
    return axios
      .put(`http://localhost:3001/user/update/${id}`, input)
      .then((response) => {
        const respuesta = response;
        console.log(`put user response => ${respuesta}`);
      });
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllusers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllusers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
      state.error = "";
    });
    builder.addCase(getAllusers.rejected, (state, action) => {
      state.loading = false;
      state.allUsers = [];
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
