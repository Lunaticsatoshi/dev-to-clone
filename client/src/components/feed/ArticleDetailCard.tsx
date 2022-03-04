import { FC } from "react";

type ArticleDetailProps = {
  title?: string;
  className?: string;
};

const ArticleDetailCard: FC<ArticleDetailProps> = ({}) => {
  return <div className="article-detail-card">ArticleDetailCard</div>;
};

export default ArticleDetailCard;
