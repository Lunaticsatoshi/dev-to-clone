import { FC, ReactNode, useEffect } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import { useAuthState } from "src/hooks";
import { userTokenPersistence } from "src/utils";
import { SidebarContextProvider } from "src/contexts";

import Header from "./Header";

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
  const { currentUser } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    const authTokens = userTokenPersistence.get();
    if (authTokens) {
      currentUser();

      if (router.pathname === "/login" || router.pathname === "/register") {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <SidebarContextProvider>
        <Header />
        <div className="main-content flex justify-between">
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
          {children}
        </div>
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
