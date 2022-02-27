import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { API_URL } from "src/config";
import { userTokenPersistence } from "src/utils";

const baseURL = API_URL;

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
  authTokens = userTokenPersistence.get()
    ? JSON.parse(userTokenPersistence.get()!)
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

    userTokenPersistence.set(JSON.stringify(refreshedTokens));

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
