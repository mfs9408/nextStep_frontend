import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";
import { Route } from "@/enums/route";

const TemplateHeaderMenu = () => {
  const router = useRouter();

  const onLogoutClick = async () => {
    // await logout().catch(() => toast.error("Something went wrong"));
    router.push(Route.LOGIN);
  };

  return (
    <>
      <DropdownMenuItem onClick={() => router.push(Route.SETTINGS)}>
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onLogoutClick}>Logout</DropdownMenuItem>
    </>
  );
};

export default TemplateHeaderMenu;
