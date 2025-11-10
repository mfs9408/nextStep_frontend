import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthGate } from "@/components/AuthGate/AuthGate";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <AuthGate>{children}</AuthGate>
  </QueryClientProvider>
);

export default Providers;
