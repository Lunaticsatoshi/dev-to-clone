import { FC, ReactNode } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";

import { SidebarContextProvider } from "src/contexts";
type LayoutProps = {
  title: string;
  description?: string;
  keywords?: string;
  children: JSX.Element | ReactNode;
};

const Layout: FC<LayoutProps> = ({
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
      <SidebarContextProvider>
        <Header />
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
        <div className="main-content flex justify-between">{children}</div>
      </SidebarContextProvider>
    </>
  );
};

Layout.defaultProps = {
  title: "Dev To",
  description: "A blogging platform for developers",
  keywords: "social media, youtuber, social media influencer",
};

export default Layout;
