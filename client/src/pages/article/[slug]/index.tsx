import type { NextPage } from "next";

import { Layout } from "src/components";
import { Reactions } from "src/modules";

const ArticlePage: NextPage = () => {
  return (
    <Layout title="Article">
      <Reactions heartCount={2} unicornCount={2} saveCount={2} />
      <div className="article-detail-container">Article</div>
      <div className="profile-sidebar">Profile</div>
    </Layout>
  );
};

export default ArticlePage;
