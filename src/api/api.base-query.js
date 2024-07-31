import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://18.196.46.54/api/",
  prepareHeaders(headers) {
    const response = Cookies.get('TOKEN_DATA')
    const data = response ? JSON.parse(response) : false
    if (data) {
      headers.set("authorization", `Bearer ${data.token}`);
      // headers.set(
      //   "Access-Control-Allow-Headers",
      //   "Content-Type, Authorization"
      // );
      // if (!headers.has("Content-Type")) {
      //   headers.set("Content-Type", "application/json");
      // }
      return headers;
    }
},
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403 || result?.response?.status === 403) {
    // Handle 403 Forbidden errors
  } else if (
    result?.error?.status === 401 ||
    result?.response?.status === 401
  ) {
    // Handle 401 Unauthorized errors
  }
  return result;
};
