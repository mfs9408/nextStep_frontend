import React, { PropsWithChildren } from "react";
import { useSession } from "@/hooks/useSession";
import { SidebarTrigger } from "../ui/sidebar";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";

const Template = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();

  return (
    <>
      <Sidebar userData={session} />
      <div className="w-full h-dvh">
        <div className="md:hidden bg-gray-background">
          <SidebarTrigger />
        </div>
        <div
          className={cn(
            "flex flex-col w-full bg-gray-background px-6 py-4 h-[calc(100%_-_28px)]",
            "md:px-10 md:py-8 md:h-full",
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Template;
