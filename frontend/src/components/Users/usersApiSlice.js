import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../redux/api/apiSlice";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.initialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {},
      providesTags: (result, error, arg) => {},
    }),
  }),
});
