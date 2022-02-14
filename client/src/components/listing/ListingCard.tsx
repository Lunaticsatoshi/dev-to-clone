import { FC } from "react";
import Link from "next/link";

type ListingCardProps = {
  header: string;
  articles: any[];
};

const ListingCard: FC<ListingCardProps> = ({ header, articles }) => {
  return (
    <div className="listing-card">
      <header>
        <h3>{header}</h3>
        {header === "Listings" && (
          <a href="/#">
            <small>see all</small>
          </a>
        )}
      </header>
      <ul>
        {articles.map((a) => {
          return (
            <li key={a.id}>
              <Link href="/#" passHref>
                <a>{a.mainTitle}</a>
              </Link>{" "}
              <br />
              <small>{a.subText}</small>
              {a.newarticle && <span>new</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListingCard;
