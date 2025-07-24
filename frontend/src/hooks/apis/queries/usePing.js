import { useQuery } from "@tanstack/react-query";
import { pingApi } from "../../../apis/ping";

export default function usePing() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: "ping",
    queryFn: pingApi,
    staleTime: 10 * 1000,
  });
}

return { isLoading, isError, data, error };
