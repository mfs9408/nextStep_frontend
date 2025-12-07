import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Route } from "@/variables/routes";
import { useRouter } from "next/navigation";
import { logOut } from "@/api/auth";
import { toast } from "sonner";
import React from "react";

const TemplateHeaderMenu = () => {
  const router = useRouter();

  const onLogoutClick = async () => {
    await logOut().catch(() => toast.error("Something went wrong"));
    router.push("/");
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
