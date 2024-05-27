import { useState } from "react";
import { env } from "../config/Env";

type Props = {
  endpoint: string;
};

type MutateProps = {
  body?: string | FormData;
  method?: "POST" | "PUT";
};

export default function useMutate({ endpoint }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // const { showError } = useNotification()

  async function mutate({ body, method = "POST" }: MutateProps) {
    setLoading(true);

    const response = await fetch(`${env.baseUrl}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body,
    }).then((response) => {
      if (!response.ok) {
        const message =
          response.status === 401
            ? "User is not authorised"
            : "Something went wrong. Please try again";

        setError(new Error(message));
      } else {
        return response;
      }
    });

    setLoading(false);

    return response;
  }

  return {
    mutate,
    loading,
    error,
  };
}
