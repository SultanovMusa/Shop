"use client";

import Button from "@/components/UI/CustomButton";
import { FaPlus } from "react-icons/fa6";
import Modal from "@/components/UI/Modal";
import { useState } from "react";
import { AddStore } from "./AddStore";
import { Table } from "@/components/UI/Table";
import { Edit, Delete, View } from "@/assets/icons/Icons";
import { useGetStoreQuery, usePutStoreMutation } from "@/services/store.service";

export const Main = () => {
  const [putStore] = usePutStoreMutation()
  const [isVisible, setIsVisible] = useState(false);
  const [store, setStore] = useState({
    name: "",
    domain: "",
    language: "",
    market: "",
    container: "",
    row: "",
    phoneNumber: "",
    userRequest: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  const { data, isLoading } = useGetStoreQuery({ params: {} });

  const onClose = () => {
    setIsVisible(false);
    setStore({
      name: "",
      domain: "",
      language: "",
      market: "",
      container: "",
      row: "",
      phoneNumber: "",
      userRequest: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
      },
    });
  };

  const handlePut = (item) => {
  }

  const STORE_COLUMNS = [
    {
      label: "Маркет",
      accessKey: "market",
    },
    {
      label: "Никнейм",
      accessKey: "username",
    },
    {
      label: "Фио",
      accessKey: "fullName",
    },
    {
      label: "Домейн",
      accessKey: "domain",
    },
    {
      label: "Ряд",
      accessKey: "row",
    },
    {
      label: "Создана в",
      accessKey: "createOfDate",
    },
    {
      label: "Действия",
      action: (item) => {
        return (
          <div className="flex items-center gap-3 cursor-pointer">
            {/* <View /> */}
            <span onClick={() => handlePut(item)}><Edit /></span>
            {/* <Delete /> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full h-[100vh-60px] overflow-y-scroll p-3">
      <div className="w-full flex justify-end">
        <Button
          onClick={() => setIsVisible(true)}
          variant="admin"
          size="small"
          className="flex items-center gap-2"
        >
          <p className="font-light text-[13px]">Добавить</p>
          <FaPlus className="text-white w-4 h-4 hover:animate-spin" />
        </Button>
      </div>
      <div className="mt-4">
        <Table
          columns={STORE_COLUMNS}
          data={data?.content}
          isLoading={isLoading}
        />
      </div>
      <Modal
        className="max-w-[700px]"
        onClose={onClose}
        isVisible={isVisible}
        title="Маркет"
      >
        <AddStore store={store} setStore={setStore} />
      </Modal>
    </div>
  );
};
