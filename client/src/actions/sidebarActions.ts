import { Dispatch } from "react";
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "src/constants/actionTypes";
import { SidebarAction } from "../reducers";

export const openSidebar = (dispatch: Dispatch<SidebarAction>) => {
  return dispatch({ type: OPEN_SIDEBAR, payload: true });
};

export const closeSidebar = (dispatch: Dispatch<SidebarAction>) => {
  return dispatch({ type: CLOSE_SIDEBAR, payload: false });
};
