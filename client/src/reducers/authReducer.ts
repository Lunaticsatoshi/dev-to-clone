import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
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
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
      };
    default:
      return state;
  }
};
