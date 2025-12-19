import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useApiQuery({ queryKey, url, method = "GET", params, data, headers, enabled = true, select }) {
  return useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      const res = await axios({
        url,
        method,
        params,
        data,
        headers,
      });

      const result = res.data.data; // assuming backend returns { data: ... }

      return select ? select(result) : result;
    },
  });
}
