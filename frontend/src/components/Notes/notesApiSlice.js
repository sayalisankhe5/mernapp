import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../redux/api/apiSlice";

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.initialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
    }),
  }),
});
