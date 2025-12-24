"use client";
import { useSessionContext } from "@/components/SessionProvider";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route";

const AuthGate = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace(Route.LOGIN);
  }, [isLoading, user]);

  return <>{children}</>;
};

export default AuthGate;
