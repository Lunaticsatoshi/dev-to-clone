import { useContext } from "react";
import { useRouter } from "next/router";
import { useAxios } from "./useAxios";

import { AuthContext } from "src/contexts";
import { userTokenPersistence } from "src/utils";

const useAuthState = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { userLogin, userRegister } = useAxios();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const response = await userLogin({ email, password });
    const { data } = response;
    const user = [data].map(
      ({ access, refresh, profile, ...rest }: any) => rest,
    )[0];
    const { access, refresh, profile } = data;
    userTokenPersistence.set(JSON.stringify({ access, refresh }));
    dispatch({ type: "LOGIN_SUCCESS", payload: { user, profile } });
    router.push("/");
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const user = await userRegister({ username, email, password });
    const profile = user.profile;
    dispatch({ type: "REGISTER_SUCCESS", payload: { user, profile } });
  };

  return {
    state,
    login,
    register,
  };
};

export default useAuthState;
