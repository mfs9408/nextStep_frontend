"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !session) {
      const next = encodeURIComponent(pathname || "/");
      router.replace(`/login?next=${next}`);
    }
  }, [isLoading, session, router, pathname]);

  if (isLoading || !session) return null;

  return <>{children}</>;
}
