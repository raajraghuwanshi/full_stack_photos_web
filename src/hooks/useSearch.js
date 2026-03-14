import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/search/searchApi";

export const useGlobalSearch = (query) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchApi(query),
    enabled: query?.trim().length > 1,
  });
};