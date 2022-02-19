import {
  useMemo,
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Method, AxiosResponse } from "axios";

import { axiosInstance, userTokenPersistence } from "src/utils";
import { AuthContext } from "src/contexts";

// Build Api Method
const buildApi = (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setLoggedOutState: () => void,
): any => {
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
            setLoggedOutState();
            break;
          default:
            toast.error(e.response.data.message, {
              icon: "⚠️",
            });
        }
      }

      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const callAxiosMethod = (methodName: Method, path: string, ...args: any) => {
    return processResponse(
      axiosInstance.request({
        method: methodName,
        url: path,
        data: args[1],
      }),
    );
  };

  const requests = {
    get: (...args: any[]) => callAxiosMethod("get", args[0], ...args),
    post: (...args: any[]) => callAxiosMethod("post", args[0], ...args),
    put: (...args: any[]) => callAxiosMethod("put", args[0], ...args),
    patch: (...args: any[]) => callAxiosMethod("patch", args[0], ...args),
    delete: (...args: any[]) => callAxiosMethod("delete", args[0], ...args),
  };

  const userLogin = (data: any) => requests.post("user/auth/login/", data);
  const userRegister = (data: any) =>
    requests.post("user/auth/register/", data);
  const userLogout = () => requests.post("user/auth/logout/");
  const getAllUsers = () => requests.get("user/all/");
  const getCurrentUser = () => requests.get("user/profile/current/");

  return {
    userLogin,
    userRegister,
    getAllUsers,
    getCurrentUser,
    userLogout,
  };
};

// Axios hook to get all axios api methods
export const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  // Set logged out state on 401 error
  const setLoggedOutState = useCallback(() => {
    userTokenPersistence.clear();
    dispatch({ type: "LOGOUT", payload: {} });
    router.push("/login");
  }, [dispatch, router]);

  const api = useMemo(
    () => buildApi(setIsLoading, setLoggedOutState),
    [setLoggedOutState],
  );

  return {
    isLoading,
    setIsLoading,
    ...api,
  };
};
