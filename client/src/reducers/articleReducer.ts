import {
  GET_ALL_ARTICLES,
  GET_ARTICLE_BY_SLUG,
} from "src/constants/actionTypes";

export type ArticleAction = {
  type: string;
  payload: any;
};

// An interface for our state
export type ArticleState = {
  articles: Array<any>;
  article: any;
  comments: Array<any>;
  comment: any;
};

export const articleReducer = (state: ArticleState, action: ArticleAction) => {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case GET_ARTICLE_BY_SLUG:
      return {
        ...state,
        article: action.payload.article,
        comments: action.payload.comments,
      };
    default:
      return state;
  }
};
