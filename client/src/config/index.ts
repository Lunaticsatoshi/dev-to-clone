import { __prod__ } from "src/constants/constants";

export const API_URL = __prod__
  ? process.env.NEXT_PUBLIC_PRODUCTION_API_ENDPOINT
  : process.env.NEXT_PUBLIC_DEVELOPMENT_API_ENDPOINT;
