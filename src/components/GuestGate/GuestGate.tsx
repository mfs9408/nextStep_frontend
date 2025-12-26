import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/enums/route";
import axios from "axios";

const GuestGate = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const user = await axios.get("/user/me", {
          baseURL: "/api",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (!cancelled && user) {
          router.replace(Route.DASHBOARD);
        }
      } catch {}
    };

    void check();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return <>{children}</>;
};

export default GuestGate;
