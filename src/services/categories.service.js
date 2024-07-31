import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/api/api.base-query";
import { clearEmptyProps } from "@/utils/helpers";

const CategoriesService = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories",
      providesTags: ["categories"],
    }),
    postCategories: builder.mutation({
      query: ({ name, categoryId, language = "RUSSIAN" }) => {
        return {
          url:'categories',
          method: "POST",
          params: {name, language, categoryId}
        };
      },
      invalidatesTags: ["categories"],
    }),
    deleteCategories: builder.mutation({
      query: (categoryId) => {
        return {
          url: `categories/${categoryId}?language=KYRGYZ`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
    }),
    putCategories: builder.mutation({
      query: ({ categoryId, name }) => {
        return {
          url: `categories/${categoryId}?name=${name}&language=KYRGYZ`,
          method: "PUT",
        };
      },
      invalidatesTags: ["categories"],
    }),
    getStoresCategories: builder.query({
      query: (storeId) => `categories/stores/${storeId}`,
    }),
  }),
});

export default CategoriesService;

export const {
  usePostCategoriesMutation,
  useGetCategoriesQuery,
  useDeleteCategoriesMutation,
  usePutCategoriesMutation,
  useGetStoresCategoriesQuery,
} = CategoriesService;
