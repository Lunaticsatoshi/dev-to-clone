import { useContext } from "react";

import { SidebarContext } from "src/contexts";
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "src/constants/actionTypes";

const useSidebarToggle = (): [boolean, () => void] => {
  const { state, dispatch } = useContext(SidebarContext);

  const sidebarToggle = () => {
    const { sidebarOpen } = state;
    if (!sidebarOpen) {
      dispatch({ type: OPEN_SIDEBAR, payload: true });
    } else {
      dispatch({ type: CLOSE_SIDEBAR, payload: false });
    }
  };

  return [state.sidebarOpen, sidebarToggle];
};

export default useSidebarToggle;
