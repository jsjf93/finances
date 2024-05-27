import { useCallback, useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
// import headersBuilder from "../helpers/headerBuilder";
import fetcher from "../libs/fetcher";
import { env } from "../config/Env";

type Props<T> = {
  endpoint: string;
  shouldSkip?: boolean;
  sessionId?: string;
  /**
   * Refresh interval in milliseconds
   */
  refreshInterval?: number;
  onSuccess?: (data: T) => void;
};

export default function useGet<T>({
  endpoint,
  shouldSkip,
  refreshInterval,
  onSuccess,
}: Props<T>) {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const skip = !endpoint || shouldSkip;
  const apiEndpoint = `${env.baseUrl}/${endpoint}`;

  const { data, error } = useSWR<T, Error>(
    apiEndpoint,
    skip
      ? null
      : async (url) => {
          setLoading(true);

          const result = await fetcher(url, {
            method: "GET",
            // headers: headersBuilder({
            //   contentType: 'application/json',
            //   // accessToken,
            //   sessionId,
            // }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          setLoading(false);

          return result;
        },
    {
      revalidateOnFocus: false,
      refreshInterval,
      onSuccess: (data: T) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    }
  );

  const refetch = useCallback(() => mutate(apiEndpoint), [apiEndpoint, mutate]);

  useEffect(() => {
    if (endpoint) {
      refetch();
    }
  }, [endpoint, refetch]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
