import type { NextPage } from "next";

import { LeftSidebar } from "src/modules";
import { Layout, ListingBar, Feed } from "src/components";

const HomePage: NextPage = () => {
  return (
    <>
      <Layout title="Home">
        <LeftSidebar />
        <Feed />
        <ListingBar />
      </Layout>
    </>
  );
};

export default HomePage;
