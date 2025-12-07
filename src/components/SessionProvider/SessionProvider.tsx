import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { useSession } from "@/hooks/useSession";
import { SessionUser } from "@/types/session";

export type SessionContextValue = {
  user: SessionUser | null;
  isLoading: boolean;
  refetchMe: () => Promise<QueryObserverResult<SessionUser, Error>>;
  logout: () => Promise<void>;
  updateMe: (data: Partial<NonNullable<SessionUser>>) => Promise<void>;
};

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined,
);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading, refetchMe, logout, updateMe } = useSession();

  const value: SessionContextValue = useMemo(
    () => ({
      user: data ?? null,
      isLoading,
      refetchMe,
      logout,
      updateMe,
    }),
    [data, isLoading, refetchMe, logout, updateMe],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSessionContext = (): SessionContextValue => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within <SessionProvider>");
  }
  return context;
};
