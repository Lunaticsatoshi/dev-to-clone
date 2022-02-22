import type { NextPage } from "next";

import { LeftSidebar, ListingBar, ArticleFeed } from "src/modules";
import { Layout } from "src/components";

const HomePage: NextPage = () => {
  return (
    <>
      <Layout title="Home">
        <LeftSidebar />
        <ArticleFeed />
        <ListingBar />
      </Layout>
    </>
  );
};

export default HomePage;
