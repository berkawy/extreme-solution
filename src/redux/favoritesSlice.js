import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const user = action.payload;
      if (!state.favorites.some((fav) => fav.id === user.id)) {
        state.favorites.push(user);
      }
    },
    removeFavorite: (state, action) => {
      const userId = action.payload;
      state.favorites = state.favorites.filter((user) => user.id !== userId);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
