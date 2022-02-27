import { __prod__ } from "src/constants/constants";

export const API_URL = __prod__
  ? process.env.NEXT_APP_PRODUCTION_API_ENDPOINT
  : process.env.NEXT_APP_DEVELOPMENT_API_ENDPOINT;
