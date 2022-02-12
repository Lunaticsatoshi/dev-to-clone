import React, {
  FC,
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";
import { sidebarReducer, SidebarState, SidebarAction } from "../reducers";

const initialState = { sidebarOpen: false };

type Props = {
  children: ReactNode;
};

export const SidebarContext = createContext<{
  state: SidebarState;
  dispatch: Dispatch<SidebarAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const SidebarContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);
  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
