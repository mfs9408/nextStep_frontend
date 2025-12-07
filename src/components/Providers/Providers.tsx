import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/components/SessionProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthGate from "@/components/AuthGate";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <AuthGate>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthGate>
    </SessionProvider>
  </QueryClientProvider>
);

export default Providers;
