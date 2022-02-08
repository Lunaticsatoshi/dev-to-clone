import type { NextPage } from "next";

import { Layout } from "src/components";

const Login: NextPage = () => {
  return (
    <>
      <Layout title="Login">
        <div className="auth-container">
            <div className="auth-container__content registration flex flex-col justify-between items-center">
                <div className="header flex flex-col justify-center items-center text-center">
                    <h1 className="header__title text-3xl font-bold">Welcome to Dev community</h1>
                    <div className="header__description text-base">DEV Community is a community of 795,483 amazing developers</div>
                </div>
            </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
