import { useContext } from "react";
import { useAxios } from "./useAxios";

import { AuthContext } from "src/contexts";

const useAuthState = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { userLogin, userRegister } = useAxios();

  const login = async (email: string, password: string) => {
    const user = await userLogin({ email, password });
    const profile = user.profile;
    dispatch({ type: "LOGIN_SUCCESS", payload: { user, profile } });
  };

  const register = async (username: string, email: string, password: string) => {
    const user = await userRegister({ username, email, password });
    const profile = user.profile;
    dispatch({ type: "REGISTER_SUCCESS", payload: { user, profile } });
  };

  return {
    login,
    register,
  };
};

export default useAuthState;
