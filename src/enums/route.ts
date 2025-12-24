import {
  BookUser,
  LayoutDashboard,
  Newspaper,
  UserRoundPen,
} from "lucide-react";

export enum Route {
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/dashboard",
  LOGOUT = "/logout",
  SETTINGS = "/settings",
  CREATE_RESUME = "/resume",
  YOUR_RESUMES = "/your-resumes",
  // CONVERTED_RESUMES = "/converted-resumes",
  NEWS = "/news",
  // MAIN = "/",
}

export enum RouteName {
  DASHBOARD = "Dashboard",
  NEWS = "News",
  SETTINGS = "Settings",
  YOUR_RESUMES = "Your resumes",
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
      {
        routeName: RouteName.CREATE_RESUME,
        route: Route.CREATE_RESUME,
        icon: BookUser,
      },
      {
        routeName: RouteName.YOUR_RESUMES,
        route: Route.YOUR_RESUMES,
        icon: UserRoundPen,
      },
      // {
      //   routeName: RouteName.EXPERIENCE_TEMPLATES,
      //   route: Route.EXPERIENCE_TEMPLATES,
      //   icon: SquareChartGantt,
      // },
    ],
  },
];
