import { useMemo, useState, Dispatch, SetStateAction } from "react";
import { Method, AxiosResponse } from "axios";
import { axiosInstance } from "src/utils";

// Build Api Method
const buildApi = (setIsLoading: Dispatch<SetStateAction<boolean>>): any => {
  const processResponse = async (
    callInstance: Promise<AxiosResponse<any, any>>,
  ) => {
    try {
      setIsLoading(true);

      const { data } = await callInstance;
      if (data && data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (e: any) {
      if (e.response && e.response.status) {
        switch (e.response.status) {
          case 401:
            console.log("401");
            break;
          default:
        }
      }

      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const callAxiosMethod = (methodName: Method, path: string, ...args: any[]) =>
    processResponse(
      axiosInstance.request({
        method: methodName,
        url: path,
        ...args,
      }),
    );

  const requests = {
    get: (...args: any[]) => callAxiosMethod("get", args[0], ...args),
    post: (...args: any[]) => callAxiosMethod("post", args[0], ...args),
    put: (...args: any[]) => callAxiosMethod("put", args[0], ...args),
    patch: (...args: any[]) => callAxiosMethod("patch", args[0], ...args),
    delete: (...args: any[]) => callAxiosMethod("delete", args[0], ...args),
  };

  const userLogin = (data: any) => requests.post("user/auth/login/", data);
  const userRegister = (data: any) =>
    requests.post("user/auth/createuser/", data);
  const getAllUsers = () => requests.get("user/all/");

  return {
    userLogin,
    userRegister,
    getAllUsers,
  };
};

// Axios hook to get all axios api methods
export const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);

  const api = useMemo(() => buildApi(setIsLoading), []);

  return {
    isLoading,
    setIsLoading,
    ...api,
  };
};
