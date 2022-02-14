import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000/api/v1";

type authToken = {
  access: string;
  refresh: string;
};

type authHeader = { Authorization: string };
// eslint-disable-next-line init-declarations
let authTokens: authToken | null;
// eslint-disable-next-line init-declarations
let axiosInstance: AxiosInstance;

const getToken = async (): Promise<authToken | null> => {
  const response = await axios.post(`${baseURL}/user/auth/token/refresh/`, {
    refresh: authTokens!.refresh,
  });

  return response.data;
};

const getAuthHeaders = async (): Promise<Partial<authHeader>> => {
  authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")!)
    : null;

  if (!authTokens) {
    return {};
  }

//   const user: any = jwt_decode(authTokens?.access || "");
//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//   if (!isExpired) return { Authorization: `Bearer ${authTokens!.access}` };

  const refreshedTokens = await getToken();

//   localStorage.setItem("authTokens", JSON.stringify(refreshedTokens!));

  return { Authorization: `Bearer ${authTokens!.access}` };
};

if (typeof window !== "undefined") {
  axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const authHeader = await getAuthHeaders();
    console.log(authHeader);

    req.headers = { ...authHeader };
  });
}

// if (typeof window !== "undefined") {
//   authTokens = localStorage.getItem("authTokens")
//     ? JSON.parse(localStorage.getItem("authTokens")!)
//     : null;

//   axiosInstance = axios.create({
//     baseURL,
//   });

//   axiosInstance?.interceptors.request.use((req) => {
//     if (!authTokens) {
//       authTokens = localStorage.getItem("authTokens")
//         ? JSON.parse(localStorage.getItem("authTokens")!)
//         : null;

//         req.headers!.Authorization = `Bearer ${authTokens?.access}`;
//     }

//     const user: any = jwt_decode(authTokens?.access || "");
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) return req;

//     const response = await axios.post(`${baseURL}/user/auth/token/refresh/`, {
//       refresh: authTokens!.refresh,
//     });

//     localStorage.setItem("authTokens", JSON.stringify(response.data));
//     req.headers!.Authorization = `Bearer ${response.data.access}`;
//     return req;
//   });
// }

export default axiosInstance!;
