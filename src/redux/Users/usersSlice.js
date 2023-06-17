import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getUsers } from "./operations";

const initialState = {
  users: {
    items: [],
    isLoading: false,
    isError: null,
  },
  followings: [],
  filter: "all",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addFollowing: (state, { payload }) => {
      state.followings.push(payload);
    },
    removeFollowing: (state, { payload }) => {
      state.followings = state.followings.filter(
        (following) => following !== payload
      );
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users.items = payload;
        state.users.isLoading = false;
        state.users.isError = null;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.users.isError = payload;
        state.users.isLoading = false;
      });
  },
});

const persistConfig = {
  key: "followings",
  storage,
  whitelist: ["followings"],
};

export const persistedUsersReducer = persistReducer(
  persistConfig,
  usersSlice.reducer
);

export const { addFollowing, removeFollowing, setFilter } = usersSlice.actions;
