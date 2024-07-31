"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useGetStoreProductsQuery } from "@/services/product.service";
import { useGetOneStoreQuery } from "@/services/store.service";
import { ProductContainer } from "@/components/Containers/ProductContainer";
import { ProductCard } from "@/components/UI/Cards/ProductCard";
import { PRODUCT_DATA } from "@/utils/consts";

export default function Main() {
  const {search} = useSelector(state => state.helper)
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data: AdminStore } = useGetOneStoreQuery({ language: "RUSSIAN" });

  const { data } = useGetStoreProductsQuery({
    storeId: AdminStore?.id,
    page: page,
    size: size,
    search: search,
  }, {skip: !AdminStore});

  return (
    <div className="w-full h-[calc(100vh-60px)] pt-5">
      <div className="w-full justify-between grid grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-3 pb-10">
      {/* <div className="flex gap-4 flew-wrap"> */}
        {data?.content?.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
