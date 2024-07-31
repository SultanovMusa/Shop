import React from "react";
import { FaBoxOpen } from "react-icons/fa";

export const OwnerSidebar = () => {
  const ROUTES = [
    { name: "Маркеты", route: "/owner/products", icon: FaBoxOpen},
  ];

  return (
    <div className="bg-adminBlue w-full max-w-[20%] h-[calc(100vh-70px)] overflow-y-scroll">
      <p className="text-[#5B809B] mt-8 text-md px-4">МЕНЮ</p>
      <ul className="mt-4">
        {ROUTES.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-3 hover:bg-Gray group px-4 py-2">
            <item.icon className="text-sidebar text-xl hover:scale-105 group-hover:text-white" />
            <a className="" href={item.route}>
              <li className="text-sidebar hover:underline text-sm mt-1 group-hover:text-white">{item.name}</li>
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
};
