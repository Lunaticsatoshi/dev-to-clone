import { FC, ReactNode } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type EditorLayoutProps = {
  title: string;
  description?: string;
  keywords?: string;
  children: JSX.Element | ReactNode;
};

const EditorLayout: FC<EditorLayoutProps> = ({
  title,
  description,
  keywords,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="editor-content">{children}</div>
    </>
  );
};

EditorLayout.defaultProps = {
  title: "Dev To",
  description: "A blogging platform for developers",
  keywords: "social media, youtuber, social media influencer",
};

export default EditorLayout;
