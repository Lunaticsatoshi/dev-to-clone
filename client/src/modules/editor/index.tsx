import Link from "next/link";
import { FaDev } from "react-icons/fa";

const ArticleEditor = () => {
  return (
    <div className="main-container">
      <div className="article-editor">
        <div className="editor-header flex justify-between items-center">
          <div className="flex items-center editor-header__left">
            <Link href="/" passHref>
              <div className="editor-header-logo flex justify-center items-center">
                <FaDev size="2.6rem" />
              </div>
            </Link>

            <div className="editor-header-head">
              create post
            </div>
          </div>

          <div className="flex items-center editor-header__right">
            <div className="editor-edit">Edit</div>
            <div className="editor-preview">Preview</div>
          </div>
        </div>
        <div className="article-editor__container"></div>
      </div>
    </div>
  );
};

export default ArticleEditor;
