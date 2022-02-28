import { useState, useEffect } from "react";

import { FeedHeader, ArticleCard } from "src/components";

const ArticleFeed = () => {
  const [articles, setArticles] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchAgain = () => {
      if (articles !== null) {
        fetch("https://dev.to/api/articles")
          .then((res) => res.json())
          .then((result) => setArticles([...articles, ...result]));
      }
    };

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const html = document.documentElement;
        const body = document.body;
        const windowheight =
          "innerHeight" in window ? window.innerHeight : html.offsetHeight;

        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        );

        const windowBottom = windowheight + window.pageYOffset;
        if (windowBottom >= docHeight) {
          console.log("we reached the bottom");
          fetchAgain();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles]);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("https://dev.to/api/articles");
      const data = await res.json();

      setArticles(data);
      console.log(data);
    }, 2000);
  }, []);
  return (
    <div className="main-container flex justify-between items-center">
      <FeedHeader />
      <div className="articles">
        {articles &&
          articles.map((article, id) => {
            return <ArticleCard key={id} {...article} />;
          })}

        {/* {!articles && [1, 2, 3, 4, 5].map((a) => <ArticleSkeleton key={a} />)} */}
      </div>
    </div>
  );
};

export default ArticleFeed;
