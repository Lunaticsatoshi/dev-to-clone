import { FC } from "react";
import { BiHeart } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

type ArticleCardProps = {
  title: string;
  cover_image: string;
  tag_list: string[];
  url: string;
  comments_count: number;
  positive_reactions_count: number;
  public_reactions_count: number;
  published_at: string;
  user: any;
};

const ArticleCard: FC<ArticleCardProps> = ({
  title,
  cover_image,
  tag_list,
  url,
  comments_count,
  positive_reactions_count,
  public_reactions_count,
  published_at,
  user,
}) => {
  return (
    <article className="article">
      {cover_image && (
        <a
          href={url}
          className="article__image"
          style={{
            backgroundImage: `url(${cover_image})`,
          }}
        >
          &nbsp;
        </a>
      )}
      <div className="article__details flex flex-col">
        <div className="article-user flex justify-start items-center">
          <div className="u-pic">
            <img src={user.profile_image} alt="user profile" />
          </div>
          <div className="user-details">
            <a href={`http://dev.to/${user.username}`}>
              <span className="u-name">{user.username}</span>
            </a>
            <a href={url}>
              <span className="time">
                {new Date(published_at).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </a>
          </div>
        </div>
        <div className="article-details">
          <a href={url}>
            <h3>{title}</h3>
          </a>

          <div className="tags">
            {tag_list.map((tag, id) => {
              return (
                <a key={id} href={`https://dev.to/t/${tag}`}>
                  <span className="tag">#{tag}</span>
                </a>
              );
            })}
          </div>

          <div className="additional-details flex items-center">
            <div className="reactions flex justify-start items-center">
              {public_reactions_count + positive_reactions_count > 0 && (
                <a href={url}>
                  <span className="flex justify-center items-center">
                    <i>
                      <BiHeart />
                    </i>
                    &nbsp;
                    {public_reactions_count + positive_reactions_count} &nbsp;
                  </span>
                </a>
              )}

              <a href={url}>
                <span className="flex justify-center items-center">
                  <i>
                    <FaRegComment />
                  </i>
                  &nbsp;
                  {comments_count > 0 ? (
                    <span>
                      {comments_count} &nbsp;
                    </span>
                  ) : null}
                  {comments_count === 0 ? (
                    <span>
                      <span className="show-mobile">{comments_count}</span>
                      &nbsp;
                      <span className="hidden-mobile">Add comment</span>
                    </span>
                  ) : null}
                </span>
              </a>
            </div>

            <div className="save">
              <small>1 min read</small>
              <button>save</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
