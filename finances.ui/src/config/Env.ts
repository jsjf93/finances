type EnvType = {
  baseUrl: string;
};

export const env: EnvType = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "",
};
