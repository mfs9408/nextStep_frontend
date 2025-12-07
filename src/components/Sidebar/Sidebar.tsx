import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionUser } from "@/types/session";
import { cn } from "@/lib/utils";
import React from "react";
import TemplateUserBlock from "@/components/Template/TemplateUserBlock";
import TemplateHeaderMenu from "@/components/Template/TemplateHeaderMenu";

interface SidebarProps {
  userData: SessionUser | undefined;
}

const Sidebar = ({ userData }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ShadcnSidebar collapsible="icon" className="py-5">
      <SidebarHeader className="mb-10">
        <SidebarMenu>
          <SidebarMenuItem>
            {userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full cursor-pointer">
                  <TemplateUserBlock userData={userData} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56">
                  {/*<TemplateHeaderMenu />*/}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>
                <Skeleton className="h-11 w-full" />
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/*<SidebarMenu className="flex flex-col gap-y-3">*/}
          {/*  {applicationsRoutes.map((routeBlock) =>*/}
          {/*    routeBlock.blocks.map((route) => (*/}
          {/*      <SidebarMenuItem key={route.routeName}>*/}
          {/*        <SidebarMenuButton*/}
          {/*          className={cn(*/}
          {/*            "cursor-pointer",*/}
          {/*            pathname === route.route && "font-semibold bg-muted",*/}
          {/*          )}*/}
          {/*          onClick={() => router.push(route.route)}*/}
          {/*        >*/}
          {/*          <route.icon className="h-4 w-4" />*/}
          {/*          <span className="text-md">{route.routeName}</span>*/}
          {/*        </SidebarMenuButton>*/}
          {/*      </SidebarMenuItem>*/}
          {/*    )),*/}
          {/*  )}*/}
          {/*</SidebarMenu>*/}
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
