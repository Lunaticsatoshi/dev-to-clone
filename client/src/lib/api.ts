import Router from "next/router";
import { toast } from "react-toastify";
import { Method, AxiosResponse } from "axios";

import { axiosInstance, userTokenPersistence } from "src/utils";
import { ILoginData, IregisterData } from "src/types";

const setLoggedOutState = () => {
  userTokenPersistence.clear();
  Router.push("/login");
};
// Build Api Method
const processResponse = async (
  callInstance: Promise<AxiosResponse<any, any>>,
) => {
  try {
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

// User urls
export const userLogin = (data: ILoginData) =>
  requests.post("user/auth/login/", data);
export const userRegister = (data: IregisterData) =>
  requests.post("user/auth/register/", data);
export const userLogout = () => requests.post("user/auth/logout/");
export const getAllUsers = () => requests.get("user/all/");
export const getCurrentUser = () => requests.get("user/profile/current/");

// Article urls
export const getAllArticles = () => requests.get("articles/all/");
export const getAllUserArticles = () => requests.get("articles/user/all");
export const getArticleById = (id: string) => requests.get(`articles/${id}/`);
export const getArticleBySlug = (slug: string) =>
  requests.get(`articles/${slug}/`);
export const createArticle = (data: any) =>
  requests.post("articles/create/", data);
export const updateArticle = (id: string, data: any) =>
  requests.put(`articles/${id}/update/`, data);
export const deleteArticle = (id: string) =>
  requests.delete(`articles/${id}/delete/`);
export const clapArticle = (data: any) => requests.post("articles/clap/", data);
export const commentArticle = (data: any) =>
  requests.post("articles/comment/", data);
export const updateComment = (id: string, data: any) =>
  requests.put(`articles/comment/${id}/update/`, data);
export const deleteComment = (id: string) =>
  requests.delete(`articles/comment/${id}/delete/`);
