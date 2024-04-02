export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const AUTH_TOKEN_NAME = process.env
  .NEXT_PUBLIC_AUTH_TOKEN_NAME as string;
export const AUTH_TOKEN_EXPIRES_IN = Number(
  process.env.NEXT_PUBLIC_AUTH_TOKEN_EXPIRES_IN as string
);
