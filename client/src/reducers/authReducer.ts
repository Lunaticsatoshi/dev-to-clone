import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  SET_USER,
} from "src/constants/actionTypes";

export type AuthAction = {
  type: string;
  payload: any;
};

// An interface for our state
export type AuthState = {
  user: any;
  profile: any;
  isAuthenticated: boolean;
  error: any;
  redirectRoute: string;
};

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile: null,
      };
    default:
      return state;
  }
};
