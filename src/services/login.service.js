import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/api/api.base-query";
import { clearEmptyProps } from "@/utils/helpers";

const LoginService = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://18.196.46.54/api/'}),
  tagTypes: ["login"],
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: ({ language = "RUSSIAN", body }) => {
        return {
          url: `/auth/login?language=${language}`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export default LoginService;

export const { useLoginMutation } = LoginService;
