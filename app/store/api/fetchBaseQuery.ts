import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  fetchFn: async (input, init) => {
    const response = await fetch(input, init);
    return response;
  },
});

export const baseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    (result?.error?.data as { message?: string })?.message === "invalid token"
  ) {
    console.log("Access token expired or invalid. Logging out...");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

  return result;
};
