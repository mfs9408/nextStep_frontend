"use client";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!session) router.replace("/login");
  }, [isLoading, session]);

  if (isLoading || !session) return null;

  return <>{children}</>;
}
