import React, {
  FC,
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";

import { authReducer, AuthAction, AuthState } from "src/reducers";

type Props = {
  children: ReactNode;
};

const initialState = {
  user: {},
  profile: {},
  isAuthenticated: false,
  error: "",
  redirectRoute: "",
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
