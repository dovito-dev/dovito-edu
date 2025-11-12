import { useQuery } from "@tanstack/react-query";

interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

export function useSession() {
  const query = useQuery<SessionUser>({
    queryKey: ["/api/me"],
    retry: false,
  });

  return {
    user: query.data,
    isAdmin: query.data?.isAdmin || false,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
  };
}
