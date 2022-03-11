import React, {
  FC,
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";

import { articleReducer, ArticleState, ArticleAction } from "src/reducers";

type Props = {
  children: ReactNode;
};

const initialState = {
  article: {},
  comment: {},
  articles: [],
  comments: [],
};

export const ArticleContext = createContext<{
  state: ArticleState;
  dispatch: Dispatch<ArticleAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const ArticleContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(articleReducer, initialState);
  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
