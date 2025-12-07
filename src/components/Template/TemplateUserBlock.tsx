import React from "react";
import { SessionUser } from "@/types/session";

interface TemplateUserBlockProps {
  userData: SessionUser;
}

const TemplateUserBlock = ({ userData }: TemplateUserBlockProps) => {
  return (
    <div className="flex items-center gap-x-2 py-1">
      {/*<div className="bg-gray-background flex h-8 w-8 items-center justify-center rounded-full">*/}
      {/*  <p className="text-sm">{userData.firstName[0]}</p>*/}
      {/*  <p className="text-sm">{userData.lastName[0]}</p>*/}
      {/*</div>*/}
      {/*<div className="flex flex-col truncate">*/}
      {/*  <p className="text-start text-sm text-primary-black truncate">*/}
      {/*    {userData.first_name} {userData.last_name}*/}
      {/*  </p>*/}
      {/*  <p className="text-xs text-start truncate text-primary-grey">*/}
      {/*    {userData.email}*/}
      {/*  </p>*/}
      {/*</div>*/}
    </div>
  );
};

export default TemplateUserBlock;
