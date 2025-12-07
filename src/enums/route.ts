import { LayoutDashboard, Newspaper } from "lucide-react";

export enum Route {
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/dashboard",
  LOGOUT = "/logout",
  SETTINGS = "/settings",
  NEWS = "/news",
  MAIN = "/",
}

export enum RouteName {
  DASHBOARD = "Dashboard",
  NEWS = "News",
  SETTINGS = "Settings",
  CREATE_RESUME = "Create resume",
}

export const APPLICATION_ROUTES = [
  {
    title: "Main",
    blocks: [
      {
        routeName: RouteName.DASHBOARD,
        route: Route.DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        routeName: RouteName.NEWS,
        route: Route.NEWS,
        icon: Newspaper,
      },
      // {
      //   routeName: RouteName.RESUME,
      //   route: Route.RESUME,
      //   icon: BookUser,
      // },
      // {
      //   routeName: RouteName.CONVERTED_RESUMES,
      //   route: Route.CONVERTED_RESUMES,
      //   icon: UserRoundPen,
      // },
      // {
      //   routeName: RouteName.EXPERIENCE_TEMPLATES,
      //   route: Route.EXPERIENCE_TEMPLATES,
      //   icon: SquareChartGantt,
      // },
    ],
  },
];
