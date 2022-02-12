import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "src/constants/actionTypes";

// An interface for our actions

export type SidebarAction = {
  type: string;
  payload: boolean;
};

// An interface for our state
export type SidebarState = {
  sidebarOpen: boolean;
};

export const sidebarReducer = (state: SidebarState, action: SidebarAction) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return { ...state, sidebarOpen: action.payload };
    case CLOSE_SIDEBAR:
      return { ...state, sidebarOpen: action.payload };
    default:
      return state;
  }
};
