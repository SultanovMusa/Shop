import { configureStore } from "@reduxjs/toolkit";
import ProductService from "@/services/product.service";
import StoreService from "@/services/store.service";
import LoginService from "@/services/login.service";
import CategoriesService from "@/services/categories.service";
import FilesService from "@/services/files.service";

import helperSlice from "./slices/helper.slice";

export const store = configureStore({
  reducer: {
    [ProductService.reducerPath]: ProductService.reducer,
    [StoreService.reducerPath]: StoreService.reducer,
    [LoginService.reducerPath]: LoginService.reducer,
    [CategoriesService.reducerPath]: CategoriesService.reducer,
    [FilesService.reducerPath]: FilesService.reducer,
    helper: helperSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductService.middleware,
      LoginService.middleware,
      StoreService.middleware,
      CategoriesService.middleware,
      FilesService.middleware
    ),
});
