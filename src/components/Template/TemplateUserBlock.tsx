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
      <div className="bg-gray-background flex h-8 w-8 bg-blue-800 items-center justify-center rounded-full">
        <p className="text-sm">{userData.firstName[0]}</p>
        <p className="text-sm">{userData.lastName[0]}</p>
      </div>
      <div className="flex flex-col truncate">
        <p className="text-start text-sm text-primary-black truncate">
          {userData.firstName} {userData.lastName}
        </p>
        <p className="text-xs text-start truncate text-primary-grey">
          {userData.email}
        </p>
      </div>
    </div>
  );
};

export default TemplateUserBlock;
