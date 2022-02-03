import type { NextPage } from "next";

import { Layout, Sidebar, ListingBar, Feed } from "src/components";

const Home: NextPage = () => {
  return (
    <>
      <Layout title="Home">
        <Sidebar />
        <Feed />
        <ListingBar />
      </Layout>
    </>
  );
};

export default Home;
