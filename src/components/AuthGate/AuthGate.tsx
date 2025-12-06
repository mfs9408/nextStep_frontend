"use client";
import { useSession } from "@/hooks/useSession";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGate({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!session) router.replace("/login");
  }, [isLoading, session]);

  if (isLoading || !session) return null;

  return <>{children}</>;
}
