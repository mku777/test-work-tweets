import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6479c974a455e257fa63c546.mockapi.io/";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/users");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
