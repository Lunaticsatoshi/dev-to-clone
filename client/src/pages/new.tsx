import type { NextPage } from "next";

import { ArticleEditor } from "src/modules";
import { EditorLayout } from "src/components";

const NewArticlePage: NextPage = () => {
  return (
    <EditorLayout title="New Article">
      <ArticleEditor />
    </EditorLayout>
  );
};

export default NewArticlePage;
