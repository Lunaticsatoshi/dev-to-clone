import { FC } from "react";

type ArticleDetailProps = {
  title?: string;
  className?: string;
};

const ArticleDetailCard: FC<ArticleDetailProps> = ({}) => {
  return (
    <div className="article-detail-card">
      <a
        href="/"
        className="article-detail-card__image"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/practicaldev/image/fetch/s--jyXrn67N--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ts3q02co540scso4asc7.png)",
        }}
      >
        &nbsp;
      </a>
    </div>
  );
};

export default ArticleDetailCard;
