import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { __prod__ } from "src/constants/constants";

const baseURL = __prod__
  ? process.env.NEXT_APP_PRODUCTION_API_ENDPOINT
  : process.env.NEXT_APP_DEVELOPMENT_API_ENDPOINT;

type authToken = {
  access: string;
  refresh: string;
};

type authHeader = { Authorization: string };
// eslint-disable-next-line init-declarations
let authTokens: authToken | null;
// eslint-disable-next-line init-declarations
let axiosInstance: AxiosInstance;

const getAuthHeaders = async (): Promise<Partial<authHeader>> => {
  authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")!)
    : null;

  if (!authTokens) {
    return {};
  } else {
    const user: any = jwt_decode(authTokens?.access || "");
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return { Authorization: `Bearer ${authTokens.access}` };

    const refreshedTokens = await axios.post(
      `${baseURL}/user/auth/token/refresh/`,
      {
        refresh: authTokens!.refresh,
      },
    );

    localStorage.setItem("authTokens", JSON.stringify(refreshedTokens));

    return { Authorization: `Bearer ${authTokens.access}` };
  }
};

if (typeof window !== "undefined") {
  axiosInstance = axios.create({
    baseURL,
    headers: {},
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const authHeader = await getAuthHeaders();
    req.headers = { ...authHeader };

    return req;
  });
}

export default axiosInstance!;
