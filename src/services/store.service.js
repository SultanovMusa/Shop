import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/api/api.base-query";
import { clearEmptyProps } from "@/utils/helpers";

const StoreService = createApi({
  reducerPath: "storeApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["store"],
  endpoints: (builder) => ({
    postStore: builder.mutation({
        query: ({language = "RUSSIAN", body}) => {
            return {
                url:`/stores?language=${language}`,
                method: 'POST',
                body: body
            }
        },
      invalidatesTags: ['store']
    }),
    getStore: builder.query({
      query: ({params, startOfdate = '2024-01-01', endOfDate = '2025-05-05'}) => {
        return {
          url: `/stores?startOfDate=${startOfdate}&endOfDate=${endOfDate}`,
          params: { ...clearEmptyProps(params) },
        }
      },
      providesTags: ['store']
    }),
    putStore: builder.mutation({
      query: ({storeId, body, language}) => {
        return {
          url: `stores/${storeId}`,
          body: body,
          params:  {language}       
        }
      },
      invalidatesTags: ['store']
    }),
    getOneStore: builder.query({
      query: ({language = 'RUSSIAN'}) => `/stores/${language}`
    })
  }),
});

export default StoreService;

export const { usePostStoreMutation, useGetStoreQuery, usePutStoreMutation, useGetOneStoreQuery } = StoreService;
