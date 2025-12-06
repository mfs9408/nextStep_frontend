"use client";
import React, { PropsWithChildren } from "react";
import Providers from "@/components/Providers";
import Template from "@/components/Template";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Providers>
      <Template>{children}</Template>
    </Providers>
  );
};

export default Layout;
