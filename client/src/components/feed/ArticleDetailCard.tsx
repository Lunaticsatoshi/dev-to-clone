import { FC } from "react";

type ArticleDetailProps = {
  title?: string;
  className?: string;
};

const ArticleDetailCard: FC<ArticleDetailProps> = ({}) => {
  return (
    <div className="article-detail-card flex justify-start items-center flex-col">
      <div className="article-detail-card-top">
        <a
          href="/"
          className="article-detail-card-top__image"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/practicaldev/image/fetch/s--jyXrn67N--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ts3q02co540scso4asc7.png)",
          }}
        >
          &nbsp;
        </a>
      </div>
      <div className="article-detail-card-body flex justify-start items-center flex-col">
        <div className="article-detail-card-body__profile flex justify-start items-center">
          <div className="profile-image-container">
            <a
              href="/"
              className="profile-image-container__image"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/practicaldev/image/fetch/s--jyXrn67N--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ts3q02co540scso4asc7.png)",
              }}
            >
              &nbsp;
            </a>
          </div>
          <div className="profile-info flex justify-start flex-col">
            <h1>Jason Taylor</h1>
            <div>
              <p>Posted on Mar 7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailCard;
