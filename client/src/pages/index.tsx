import type { NextPage } from "next";

import { Layout } from "src/components";

const Home: NextPage = () => {
  return (
    <>
      <Layout title="Home">
        <h1 className="text-3xl font-bold">Welcome to Dev.to clone</h1>
      </Layout>
    </>
  );
};

export default Home;
