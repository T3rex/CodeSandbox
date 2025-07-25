import { useQuery } from "@tanstack/react-query";
import { pingApi } from "../../../apis/ping";
import { useState } from "react";

export default function usePing() {
  const [toggle, setToggle] = useState(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["ping"],
    queryFn: pingApi,
    staleTime: 0,
    enabled: toggle,
  });
  return { isLoading, isError, data, error, setToggle };
}
