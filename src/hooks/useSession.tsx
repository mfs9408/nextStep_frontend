import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionUser } from "@/types/session";
import { api } from "@/lib/api";

const getMe = async (): Promise<SessionUser> => {
  const { data } = await api.get("/auth/me", { params: { _: Date.now() } });
  return data ?? null;
};

export function useSession() {
  const qc = useQueryClient();

  const sessionQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  const logout = useMutation({
    mutationFn: async () => (await api.post("/auth/logout")).data,
    onSuccess: () => {
      qc.setQueryData<SessionUser>(["me"], null);
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const updateMe = useMutation({
    mutationFn: async (patch: Partial<NonNullable<SessionUser>>) =>
      (await api.patch("/user/me", patch)).data,
    onSuccess: (data) => {
      qc.setQueryData<SessionUser>(["me"], (prev) =>
        prev ? { ...prev, ...data } : prev,
      );
    },
  });

  return {
    ...sessionQuery,
    refetchMe: sessionQuery.refetch,
    logout: logout.mutateAsync,
    updateMe: updateMe.mutateAsync,
  };
}
