import Link from "next/link";
import { Form, useFormik, FormikProvider } from "formik";
import { FaDev } from "react-icons/fa";
import { CgShapeHexagon } from "react-icons/cg";

import { MDEditor, InputTextField, Button } from "src/components";

const ArticleEditor = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  return (
    <div className="editor-container flex justify-between items-center gap-2">
      <FormikProvider value={formik}>
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
          <Form>
            <div className="article-editor__container">
              <div className="article-editor-top">
                <div className="article-editor-top__cover flex justify-center items-center">
                  <div>Add a cover image</div>
                  <input type="file" />
                </div>
                <div className="article-editor-top__title">
                  <InputTextField
                    name="title"
                    className="text-field"
                    placeholder="New post title here..."
                    autoComplete="off"
                    aria-label="Post-Title"
                  />
                </div>
              </div>
              <div className="article-editor-body">
                <MDEditor name="content" />
              </div>
            </div>
            <div className="flex justify-start items-center article-actions">
              <Button className="btn publish-button">Publish</Button>
              <div className="draft-button">Save draft</div>
              <div className="publish-options">
                <i>
                  <CgShapeHexagon />
                </i>
              </div>
              <div className="reset-button">Revert new changes</div>
            </div>
          </Form>
        </div>
      </FormikProvider>

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
