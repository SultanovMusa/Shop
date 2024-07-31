"use client";

import React, { Suspense, lazy } from "react";
import { usePathname } from "next/navigation";

// const AdminHeader = lazy(() => import("@/screens/Admin/Layout/Header/AdminHeader"));
// const ClientHeader = lazy(() => import("@/screens/User/Header/ClientHeader"));
// const OwnerHeader = lazy(() => import("@/screens/Owner/Layout/OwnerHeader"));

import { AdminHeader } from "@/screens/Admin/Layout/Header/AdminHeader";
import { ClientHeader } from "@/screens/User/Header/ClientHeader";
import { OwnerHeader } from "@/screens/Owner/Layout/OwnerHeader";

export const Header = () => {
  const pathName = usePathname();

  let HeaderComponent = ClientHeader;

  if (pathName.startsWith("/admin")) {
    HeaderComponent = AdminHeader;
  } else if (pathName.startsWith("/owner")) {
    HeaderComponent = OwnerHeader;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderComponent />
    </Suspense>
  );
};
