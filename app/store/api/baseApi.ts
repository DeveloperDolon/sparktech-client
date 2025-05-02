import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./fetchBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ["user", "client", "project", "interaction", "reminder"],
});
