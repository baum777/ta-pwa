import { useQuery } from "@tanstack/react-query";
import { dsSearch } from "../../api/ds";

export function useDexsearch(q: string) {
  return useQuery({
    queryKey: ["ds-search", q],
    queryFn: () => dsSearch(q),
    enabled: q.trim().length > 1,
    staleTime: 15_000,
    refetchOnWindowFocus: false,
  });
}
