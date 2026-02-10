import { QueryClient } from "@tanstack/react-query";

export const QUERY_CACHE_TIME_MS = 1000 * 60 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CACHE_TIME_MS,
      gcTime: QUERY_CACHE_TIME_MS,
      refetchOnWindowFocus: false,
    },
  },
});
