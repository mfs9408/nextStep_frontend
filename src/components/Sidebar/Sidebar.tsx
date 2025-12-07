import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import TemplateUserBlock from "@/components/Template/TemplateUserBlock";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { APPLICATION_ROUTES } from "@/enums/route";
import { SessionUser } from "@/types/session";
import { cn } from "@/lib/utils";
import React from "react";

interface SidebarProps {
  userData: SessionUser | undefined;
}

const Sidebar = ({ userData }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader className="mb-10">
        <SidebarMenu>
          <SidebarMenuItem>
            {userData ? (
              <TemplateUserBlock userData={userData} />
            ) : (
              <div className="flex gap-x-2 items-center">
                <Skeleton className="h-8 !w-10 w-full rounded-full bg-card" />
                <Skeleton className="h-11 w-full bg-card" />
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="flex flex-col gap-y-2">
            {APPLICATION_ROUTES.map((routeBlock) =>
              routeBlock.blocks.map((route) => (
                <SidebarMenuItem key={route.routeName}>
                  <SidebarMenuButton
                    className={cn(
                      "cursor-pointer text-foreground",
                      pathname === route.route && "font-semibold bg-muted",
                    )}
                    onClick={() => router.push(route.route)}
                  >
                    <route.icon className="h-4 w-4" />
                    <span className="text-md">{route.routeName}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
