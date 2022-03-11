import React, {
  FC,
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";

type Props = {
  children: ReactNode;
};

const initialState = {
    article: {},
    articles: [],
    comments: [],
};

export const ArticleContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const ArticleContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer("", initialState);
  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
