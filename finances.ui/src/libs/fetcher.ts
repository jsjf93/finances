// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON | null> {
  const res = await fetch(input, init);

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    throw error;
  }

  return await res.json();
}
