import { useEffect } from "react";
import { axiosInstance } from "src/utils";
import type { NextPage } from "next";

import { LeftSidebar } from "src/modules";
import { Layout, ListingBar, Feed } from "src/components";

const HomePage: NextPage = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get("/user/all/");
      console.log(response);
    };

    getData();
  }, []);
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
