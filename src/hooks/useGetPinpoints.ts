import { getPinpoints } from "@/api/pinpoints";
import { getPinpointsData, getPinpointsProps } from "@/types";
import React, { useEffect } from "react";

function useGetPinpoints({ query, limit, offset }: getPinpointsProps) {
  const [data, setData] = React.useState<getPinpointsData>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState({} as any);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Effect to fetch data when query, limit, or offset changes
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await getPinpoints({ query, limit, offset });
        setData(response);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setIsError(true);
        setError(error?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, limit, offset]);

  return { data, isError, error, isLoading };
}
export default useGetPinpoints;
