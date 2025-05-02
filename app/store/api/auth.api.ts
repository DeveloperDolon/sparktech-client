

import { TLoginUser, TSignUpUser } from "@/app/types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload: TSignUpUser) => ({
        url: "/user/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (payload: TLoginUser) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    me: builder.query({
      query: ({}) => ({
        url: "user/me",
        method: "/user/me",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useMeQuery } = authApi;
