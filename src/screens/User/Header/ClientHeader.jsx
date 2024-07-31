"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Court, Favorite, Catalog, Search } from "@/assets/icons/Icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/UI/Dropdown";

import { Button } from "@/components/UI/Button";
import { CustomInput } from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import { Login } from "@/components/Login";
import { getSearch } from "@/store/slices/helper.slice";

export const ClientHeader = () => {
  const {search} = useSelector(state => state.helper)
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState({
    username: "",
    password: "",
  });

  const onClose = () => {
    setIsVisible(false);
    setCode({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <Modal
        onClose={onClose}
        className="max-w-[300px] w-full"
        isVisible={isVisible}
        title="Авторизация"
      >
        <Login setIsVisible={setIsVisible} code={code} setCode={setCode} />
      </Modal>
      <header className="fixed top-0 w-full h-[60px] background flex justify-center items-center">
        <div className="w-full flex justify-between items-center gap-8 xs:gap-4 px-20 lg:px-16 md:px-12 sm:px-4 xs:px-2">
          <h1 className="text-3xl text-white font-medium xs:text-lg">LOGO</h1>
          <div className="w-full flex gap-10 xs:gap-2 items-center justify-end">
            <CustomInput
              placeholder="Искать..."
              Icon={Search}
              isLoading={false}
              disabled={false}
              color="bg-transparent"
              width="300px"
              value={search}
              onChange={(e) => dispatch(getSearch(e.target.value))}
            />
            <div className="flex gap-4 xs:gap-1 cursor-pointer">
              <Dropdown>
                <DropdownTrigger>
                  <User />
                </DropdownTrigger>
                <DropdownMenu className="right-0 rounded-tr-[0px]">
                  {/* <DropdownItem>Войти</DropdownItem> */}
                  <DropdownItem onClick={() => setIsVisible(true)}>
                    Войти
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Favorite />
              <Court />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
