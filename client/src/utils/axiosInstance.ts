import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8000/api/v1";

type authToken = {
  access: string;
  refresh: string;
};
// eslint-disable-next-line init-declarations
let authTokens: authToken | null;
// eslint-disable-next-line init-declarations
let axiosInstance: AxiosInstance;

if (typeof window !== "undefined") {
  authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")!)
    : null;

  axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` || "" },
  });

  axiosInstance?.interceptors.request.use(async (req) => {
    if (!authTokens) {
      authTokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens")!)
        : null;

      req.headers!.Authorization = `Bearer ${authTokens?.access}` || "";
    }

    const user: any = jwt_decode(authTokens?.access || "");
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/user/auth/token/refresh/`, {
      refresh: authTokens!.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));
    req.headers!.Authorization = `Bearer ${response.data.access}`;
    return req;
  });
}

export default axiosInstance!;
