import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../authSlice";

const baseQuery1 = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery1(args, api, extraOptions);
  if (result?.error?.status == 403) {
    const refreshResult = await baseQuery1("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery1(args, api, extraOptions);
    } else if (refreshResult?.error?.status == 403) {
      refreshResult.error.data.message = "login has expired";
      return refreshResult;
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
