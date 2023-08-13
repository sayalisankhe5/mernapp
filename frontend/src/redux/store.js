import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authSliceReducer from "./authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;

setupListeners(store.dispatch);
