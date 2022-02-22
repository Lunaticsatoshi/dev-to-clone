import type { NextPage } from "next";

import { EditorLayout, Feed } from "src/components";

const NewArticlePage: NextPage = () => {
  return (
    <EditorLayout title="New Article">
      <Feed />
    </EditorLayout>
  );
};

export default NewArticlePage;
