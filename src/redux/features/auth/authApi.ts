import { apiSlice } from "../api/apiSlice";
import {categoryList, userLoggedIn, userLoggedOut, userRegistration} from "./authSlice";

type RegistrationResponse = {
  message: string;
  Data: string;
};

type RegistrationData = {
  fullName: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register endpoint
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/user/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log('register res ',result);
          dispatch(
            userRegistration({
              token: result.data.Data,
            })
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    // Activation endpoint
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "/",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    // Login endpoint
    login: builder.mutation({
      query: (values) => ({
        url: "/user/auth/signin",
        method: "POST",
        body: values
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //  Set access and refresh tokens
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.user,
            })
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    // Logout endpoint
    logOut: builder.query({
      query: () => ({
        url: "",
        method: "GET",
        // credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),


    // get categories with services endpoint
    categories: builder.query({
      query: () => ({
        url: "/cat/get/all",
        method: "GET"
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //  Set access and refresh tokens
          dispatch(
              // result.data["Data"]
              categoryList({
                categories: result.data["Data"],
              })
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    // getCategories: builder.query({
    //   query: () => ({
    //     url: "/cat/get/all",
    //     method: "GET",
    //   }),
    //   async onQueryStarted(_arg, { queryFulfilled, dispatch  }) {
    //     try {
    //       const result = await queryFulfilled;
    //       dispatch(
    //         categoryList({
    //           categoryList: result.data["Data"],
    //         })
    //       );
    //     } catch (error: unknown) {
    //       console.log(error);
    //     }
    //   },
    // }),

  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useLogOutQuery,
  useCategoriesQuery,
} = authApi;
