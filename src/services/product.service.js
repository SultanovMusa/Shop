import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/api/api.base-query";
import { clearEmptyProps } from "@/utils/helpers";

const ProductService = createApi({
  reducerPath: "porductApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getStoreProducts: builder.query({
      query: ({ storeId, page, size, search }) => {
        return {
          url: `products/stores/${storeId}?page=${page}&size=${size}`,
          params: { ...clearEmptyProps({ search }) },
        };
      },
      providesTags: ["product"],
    }),
    postStoreProduct: builder.mutation({
      query: ({ storeId, body, language = "RUSSIAN" }) => {
        return {
          url: `products/stores/${storeId}?language=${language}`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ productId, language = "RUSSIAN" }) => {
        return {
          url: `products/${productId}?language=${language}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
    putProduct: builder.mutation({
      query: ({ productId, body, language = "RUSSIAN" }) => {
        return {
          url: `products/${productId}?language=${language}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export default ProductService;

export const {
  useGetStoreProductsQuery,
  usePostStoreProductMutation,
  usePutProductMutation,
  useDeleteProductMutation,
} = ProductService;
