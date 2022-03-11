import { sidebarReducer, SidebarAction, SidebarState } from "./sidebarReducer";
import { authReducer, AuthAction, AuthState } from "./authReducer";
import { articleReducer, ArticleAction, ArticleState } from "./articleReducer";

export { sidebarReducer, authReducer, articleReducer };
export type {
  SidebarAction,
  SidebarState,
  AuthAction,
  AuthState,
  ArticleAction,
  ArticleState,
};
