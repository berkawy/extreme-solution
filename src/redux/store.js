import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { favoritesReducer } from "./favoritesSlice";

const persistConfig = {
  key: "root",
  storage, // localStorage for persistence
};

const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    favorites: persistedReducer,
  },
});

export const persistor = persistStore(store);
