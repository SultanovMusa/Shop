"use client";

import { useEffect, useState } from "react";

import Input from "@/components/UI/CutomInput";
import Button from "@/components/UI/CustomButton";
import DynamicTextArea from "@/components/UI/CutomTextArea";
import ImagePicker from "@/components/UI/ImagePicker";
import MultiImagePicker from "@/components/UI/MutliImagePicker";
import NestedSelect from "@/components/UI/NestedSelect";
import {
  usePostStoreProductMutation,
  usePutProductMutation,
} from "@/services/product.service";
import Cookies from "js-cookie";
import { customToast } from "@/components/Natification";

export const AddProduct = ({
  productState,
  setProductState,
  categoryData,
  storeId,
  onClose,
  productId,
  type,
}) => {
  const [postProduct] = usePostStoreProductMutation();
  const [putProduct] = usePutProductMutation();

  const [isLoading, setisLoading] = useState(false);
  const [validation, setValidation] = useState(false);

  const changeValue = (value, name) => {
    setProductState((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePost = async () => {
    setisLoading(true);
    const response = Cookies.get("TOKEN_DATA");
    const data = response ? JSON.parse(response) : false;

    const formData = new FormData();
    formData.append("file", productState.image);

    const image = await fetch("http://18.196.46.54/api/s3", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const imageData = await image.json();
    if (type === "post") {
      // const formDataList = new FormData();
      // productState.images.forEach((file, index) => {
      //   formDataList.append(`files[${index}]`, file);
      // });

      // const imageList = await fetch("http://18.196.46.54/api/s3/all", {
      //   method: "POST",
      //   body: formDataList,
      //   headers: {
      //     Authorization: `Bearer ${data.token}`,
      //   },
      // });

      const res = await postProduct({
        storeId: storeId,
        body: {
          ...productState,
          image: imageData.message,
          storeId: storeId,
          images: [imageData.message],
        },
      });
      if (res.data) {
        customToast("success", res.data.message);
      } else {
        customToast("error", response.error.data.message);
      }
    } else {
      const res = await putProduct({
        productId: productId,
        body: {
          ...productState,
          image: imageData.message,
          storeId: storeId,
          images: [imageData.message],
        },
      });
      if (res.data) {
        customToast("success", res.data.message);
      } else {
        customToast("error", response.error.data.message);
      }
    }
    onClose();
    setisLoading(false);
  };

  useEffect(() => {
    const validation =
      productState.name &&
      productState.image &&
      productState.description &&
      productState.price &&
      productState.categoryId
        ? false
        : true;
    setValidation(validation);
  }, [productState]);

  return (
    <div className="w-[350px] h-[500px] overflow-auto p-1">
      <div className="flex gap-2 mb-2">
        <Input
          label="Название"
          placeholder="Напишите название"
          value={productState.name}
          onChange={(e) => changeValue(e.target.value, "name")}
          className="text-Gray"
        />
        <Input
          label="Цена"
          placeholder="Напишите цену"
          value={productState.price}
          onChange={(e) => changeValue(e.target.value, "price")}
          className="text-Gray max-w-36"
        />
      </div>
      <DynamicTextArea
        className="custom-class"
        onChange={(e) => changeValue(e.target.value, "description")}
        placeholder="Подберите описание товара"
        label="Описание"
        value={productState.description}
      />
      <NestedSelect
        label="Категория товара"
        placeholder="Выберите категорию..."
        options={categoryData}
        value={productState.categoryId}
        onChange={(e) => changeValue(e, "categoryId")}
      />
      <div className="mt-2 flex flex-col w-full gap-2">
        <ImagePicker
          value={productState.image}
          onChange={(e) => changeValue(e, "image")}
          clearImage={() => changeValue("", "image")}
        />
        <MultiImagePicker onChange={(files) => changeValue(files, "images")} />
      </div>
      <div className="w-full flex justify-end mt-2">
        <Button
          size="small"
          onClick={handlePost}
          type="button"
          className="w-fit"
          disabled={validation}
          isLoading={isLoading}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};
