import { useContext } from "react";
import { useAxios } from "./useAxios";

import { ArticleContext } from "src/contexts";
import { GET_ALL_ARTICLES } from "src/constants/actionTypes";

const useArticle = () => {
  const { state, dispatch } = useContext(ArticleContext);
  const { getAllArticles } = useAxios();

  const getArticles = async () => {
    const response = await getAllArticles();
    const { data } = response;
    // const articles = [data].map(({ articles, ...rest }: any) => rest)[0];
    dispatch({ type: GET_ALL_ARTICLES, payload: data });
  };

  return {
    state,
    getArticles,
  };
};

export default useArticle;
