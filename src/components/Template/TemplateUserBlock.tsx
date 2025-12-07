import { SessionUser } from "@/types/session";
import React from "react";

interface TemplateUserBlockProps {
  userData: SessionUser;
}

const TemplateUserBlock = ({ userData }: TemplateUserBlockProps) => {
  if (!userData) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 py-1">
      <div className="bg-sidebar-primary-foreground flex h-8 min-w-8 w-8 items-center justify-center rounded-full">
        <p className="text-sm">{userData.firstName[0]}</p>
        <p className="text-sm">{userData.lastName[0]}</p>
      </div>

      <div className="flex min-w-0 flex-col">
        <p className="truncate text-start text-sm font-bold text-primary-black">
          {userData.firstName} {userData.lastName}
        </p>
        <p className="truncate text-xs text-start text-primary-grey">
          {userData.email}
        </p>
      </div>
    </div>
  );
};

export default TemplateUserBlock;
