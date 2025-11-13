"use client";
import React, { PropsWithChildren } from "react";
import Link from "next/link";

interface AuthWrapperProps extends PropsWithChildren {
  image: React.ReactNode;
}

const AuthWrapper = ({ children, image }: AuthWrapperProps) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              icon
            </div>
            Femu Dev Corporation
          </Link>
        </div>
        {children}
      </div>
      <div className="bg-muted relative hidden lg:block">{image}</div>
    </div>
  );
};

export default AuthWrapper;
