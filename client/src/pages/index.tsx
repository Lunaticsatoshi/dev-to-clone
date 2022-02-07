import type { NextPage } from "next";

import { LeftSidebar } from "src/modules";
import { Layout, ListingBar, Feed } from "src/components";

const Home: NextPage = () => {
  return (
    <>
      <Layout title="Home">
        <LeftSidebar sidebarOpen={true} closeSidebar={() => {}} />
        <Feed />
        <ListingBar />
      </Layout>
    </>
  );
};

export default Home;
