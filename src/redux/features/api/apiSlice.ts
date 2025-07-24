import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../../../utils/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://157.173.105.37:8001",
    // baseUrl: "http://192.168.1.20:8001",
    // baseUrl: "http://localhost:8001",

    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      const refreshToken = "";
      if (accessToken) {
        headers.set("x-access-token", accessToken);
      }
      if (refreshToken) {
        headers.set("refresh-token", refreshToken);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "GET",
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "/user/auth/profile",
        method: "POST",
      }),
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
