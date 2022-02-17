import type { NextPage } from "next";

import { LeftSidebar, ListingBar } from "src/modules";
import { Layout, Feed } from "src/components";

const HomePage: NextPage = () => {
  console.log(process.env.NEXT_APP_DEVELOPMENT_API_ENDPOINT);
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
