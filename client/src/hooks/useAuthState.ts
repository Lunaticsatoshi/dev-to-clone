import { useContext } from "react";
import { useRouter } from "next/router";
import { useAxios } from "./useAxios";

import { AuthContext } from "src/contexts";
import { userTokenPersistence } from "src/utils";

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  SET_USER,
} from "src/constants/actionTypes";

const useAuthState = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { userRegister, userLogout, getCurrentUser } = useAxios();
  const router = useRouter();

  const login = (data: any) => {
    const { access, refresh } = data;
    userTokenPersistence.set(JSON.stringify({ access, refresh }));
    router.push("/");
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const user = await userRegister({ username, email, password });
    const profile = user.profile;
    dispatch({ type: REGISTER_SUCCESS, payload: { user, profile } });
  };

  const logout = async () => {
    const authTokens = userTokenPersistence.get()
      ? JSON.parse(userTokenPersistence.get()!)
      : null;
    await userLogout({ refresh: authTokens.refresh });
    userTokenPersistence.clear();
    dispatch({ type: LOGOUT, payload: {} });
    router.push("/login");
  };

  const currentUser = async () => {
    const response = await getCurrentUser();
    const { data } = response;
    const user = [data].map(({ profile, ...rest }: any) => rest)[0];
    const { profile } = data;
    dispatch({ type: SET_USER, payload: { user, profile } });
  };

  return {
    state,
    login,
    register,
    currentUser,
    logout,
  };
};

export default useAuthState;
