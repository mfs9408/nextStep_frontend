"use client";
import React, { PropsWithChildren } from "react";
import GuestGate from "@/components/GuestGate";

const Layout = ({ children }: PropsWithChildren) => {
  return <GuestGate>{children}</GuestGate>;
};

export default Layout;
