import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/api/api.base-query";
import { clearEmptyProps } from "@/utils/helpers";

const FilesService = createApi({
  reducerPath: "filesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postImage: builder.mutation({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/s3`,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    postImageList: builder.mutation({
      query: ({ files }) => {
        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
        return {
          url: `/s3/all`,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    deleteImage: builder.mutation({
      query: (link) => {
        return {
          url: `s3?fileLink=${link}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export default FilesService;

export const {
  usePostImageListMutation,
  usePostImageMutation,
  useDeleteImageMutation,
} = FilesService;
