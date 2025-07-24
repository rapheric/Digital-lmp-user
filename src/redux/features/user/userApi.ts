import { apiSlice } from "../api/apiSlice";

type FieldType = {
  fullname?: string;
  phone?: string;
  email?: string;
  bio?: string;
  userid?: string;
};
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation<ResponseData, FieldType>({
      query: (values) => ({
        url: "/user/auth/update/profile/user",
        method: "POST",
        body: values,
      }),
    }),
    RequestEmailCode: builder.mutation({
      query: () => ({
        url: "/user/auth/request/emailcode",
        method: "POST",
      }),
    }),
    ValidateEmail: builder.mutation({
      query: () => ({
        url: "/user/auth/validate/emailcode",
        method: "POST",
        body: {},
      }),
    }),
    RequestPasswordReset: builder.mutation({
      query: (key) => ({
        url: `/user/auth/validate/emailcode?key=${key}`,
        method: "POST",
      }),
    }),
    ConfirmResetCode: builder.mutation({
      query: (data) => ({
        url: "/user/auth/validate/emailcode",
        method: "POST",
        body: data,
      }),
    }),
    ResetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/auth/validate/emailcode",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (values) => ({
        url: "/user/auth/update/password ",
        method: "POST",
        body: values,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useEditProfileMutation,
  useRequestEmailCodeMutation,
  useValidateEmailMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
  useRequestPasswordResetMutation,
  useConfirmResetCodeMutation,
  useResetPasswordMutation,
} = userApi;
