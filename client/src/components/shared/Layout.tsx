import { FC, ReactNode } from "react";
import Head from "next/head";

import Header from "./Header";

type LayoutProps = {
  title: string;
  description?: string;
  keywords?: string;
  children: ReactNode;
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
      <Header />
      <div className="main-content">{children}</div>
    </>
  );
};

Layout.defaultProps = {
  title: "Dev To",
  description: "A blogging platform for developers",
  keywords: "social media, youtuber, social media influencer",
};

export default Layout;
