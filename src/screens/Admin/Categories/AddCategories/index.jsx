"use client";

import { useState } from "react";
import Input from "@/components/UI/CutomInput";
import Button from "@/components/UI/CustomButton";
import { usePostCategoriesMutation, usePutCategoriesMutation } from "@/services/categories.service";

export const AddCategories = ({ categoryId, setIsVisible, type }) => {
  const [postCategories] = usePostCategoriesMutation();
  const [putCategories] = usePutCategoriesMutation()
  const [name, setName] = useState('');


  const handlePost = async () => {
    if(type === 'post'){
      const response = await postCategories({name: name, categoryId: categoryId}).unwrap()
    }else{
      const response = await putCategories({name: name, categoryId: categoryId}).unwrap()
    }
    setIsVisible(false)
  }

  return (
    <>
      <Input
        label="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-Gray"
      />
      <div className="w-full flex justify-end mt-4">
        <Button onClick={handlePost} type="button" className="w-fit">
          Отправить
        </Button>
      </div>
    </>
  );
};
