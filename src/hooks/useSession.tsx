import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionUser } from "@/types/session";
import { patch, post } from "@/lib/api";
import { Route } from "@/enums/route";
import { getMe } from "@/api/user";

export function useSession() {
  const qc = useQueryClient();

  const sessionQuery = useQuery({
    queryKey: ["me"],
    queryFn: async () => await getMe(),
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  const logout = useMutation({
    mutationFn: async () => (await post(Route.LOGOUT)).data,
    onSuccess: () => {
      qc.setQueryData<SessionUser>(["me"], null);
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const updateMe = useMutation({
    mutationFn: async (data: Partial<NonNullable<SessionUser>>) =>
      (await patch("/user/me", data)).data, // TODO fix
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
