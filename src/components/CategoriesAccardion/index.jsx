"use client";

import { useState } from "react";

import { useDeleteCategoriesMutation } from "@/services/categories.service";

import { IoIosArrowDown } from "react-icons/io";
import { Edit, Delete } from "@/assets/icons/Icons";
import { FaPlus } from "react-icons/fa6";

export const CategoriesAccardion = ({ data, setIsVisible, setId, setType }) => {
  const [open, setOpen] = useState([-1, -1, -1, -1]);

  const colors = ["#449EF2", "#2FC509", "#F99808", "#8B0000"];

  const [deleteCategory] = useDeleteCategoriesMutation();

  const handleOpenItem = (column, index) => {
    let newOpen = [...open];
    if (open[column] === index) {
      newOpen = newOpen.map((item, forIndex) =>
        column <= forIndex ? -1 : item
      );
    } else {
      newOpen[column] = index;
      newOpen = newOpen.map((item, forIndex) =>
        column < forIndex ? -1 : item
      );
    }
    setOpen(newOpen);
  };

  const handleDelete = async (id) => {
    const response = await deleteCategory(id);
  };

  const handleAdd = (id) => {
    setType('post')
    setId(id);
    setIsVisible(true);
  };

  const handlePut = (item) => {
    setType("put");
    setId(item.id);
    setIsVisible(true);
  };



  const Generate = ({ item, column, index }) => {
    return (
      <div
        className={`w-full h-fit rounded-md border-[1px] border-solid border-gray-300 transition-all duration-1000 ease-in-out bg-gray-50 shadow-lg relative`}
      >
        <div
          style={{ backgroundColor: colors[column] }}
          className={`absolute left-0 top-0 bottom-0 w-2 transition-all duration-500 ease-linear rounded-l-md`}
        ></div>
        <div className="w-full h-12 flex ">
          <div className="w-full h-12 min-h-12 flex items-center justify-between px-4 gap-4">
            <div className="flex items-center gap-3">
              {column < 3 && (
                <IoIosArrowDown
                  onClick={() =>
                    item.categoryResponses && handleOpenItem(column, index)
                  }
                  className={`${
                    item.categoryResponses ? "text-Gray" : "text-gray-300"
                  } transition-all duration-500 w-5 h-5 cursor-pointer ${
                    open[column] === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
              <p className="text-sm text-Gray">{item.name}</p>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              {column < 3 && (
                <FaPlus
                  onClick={() => handleAdd(item.id)}
                  className="text-[#909CB5]"
                />
              )}
              <span onClick={() => handlePut(item)} >
                <Edit/>
              </span>
              <span onClick={() => handleDelete(item.id)}>
                <Delete />
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col gap-2 ${
            item.categoryResponses
              ? open[column] === index
                ? "h-fit pr-3 py-2 pl-6"
                : "h-0"
              : "hidden"
          }`}
        >
          {open[column] === index &&
            item.categoryResponses &&
            item.categoryResponses.map((innerItem, index) => (
              <Generate
                item={innerItem}
                key={index}
                column={column + 1}
                index={index}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 w-full flex flex-col gap-2">
      {data?.map((item, index) => (
        <Generate
          item={item}
          key={index}
          index={index}
          color="#449EF2"
          column={0}
        />
      ))}
    </div>
  );
};
