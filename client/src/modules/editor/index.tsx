import Link from "next/link";
import { FaDev } from "react-icons/fa";

import { MDEditor } from "src/components";

const ArticleEditor = () => {
  return (
    <div className="editor-container flex justify-between items-center gap-2">
      <div className="article-editor">
        <div className="editor-header flex justify-between items-center">
          <div className="flex items-center editor-header__left">
            <Link href="/" passHref>
              <div className="editor-header-logo flex justify-center items-center">
                <FaDev size="2.6rem" />
              </div>
            </Link>

            <div className="editor-header-head">create post</div>
          </div>

          <div className="flex items-center editor-header__right">
            <div className="editor-edit">Edit</div>
            <div className="editor-preview">Preview</div>
          </div>
        </div>
        <div className="article-editor__container">
          <div className="article-editor-top">
            <div className="article-editor-top__cover flex justify-center items-center">
              <div>Add a cover image</div>
              <input type="file" />
            </div>
            <div className="article-editor-top__title">
              <textarea
                className="text-field"
                placeholder="New post title here..."
                autoComplete="off"
                aria-label="Post-Title"
              />
            </div>
          </div>
          <div className="article-editor-body">
            <MDEditor />
          </div>
        </div>
      </div>

      <div className="tips-container">
        <h1>Writing a great post title</h1>
        <ul>
          <li>
            Think of your post title as a super short (but compelling!)
            description — like an overview of the actual post in one short
            sentence.
          </li>
          <li>
            Use keywords where appropriate to help ensure people can find your
            post by search.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArticleEditor;
