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
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        let loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Notes", id: "LIST" },
            ...result.ids.map((id) => ({
              type: "Notes",
              id,
            })),
          ];
        } else {
          return [{ type: "Notes", id: "LIST" }];
        }
      },
    }),
  }),
});
