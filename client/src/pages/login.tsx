import type { NextPage } from "next";

import { LoginForm } from "src/modules";
import { Layout } from "src/components";

const Login: NextPage = () => {
  return (
    <>
      <Layout title="Login">
        <div className="auth-container">
          <div className="auth-container__content registration flex flex-col justify-between items-center">
            <div className="header flex flex-col justify-center items-center text-center">
              <h1 className="title text-3xl font-bold">
                Welcome to Dev community
              </h1>
              <div className="description text-base">
                DEV Community is a community of 795,483 amazing developers
              </div>
            </div>
            <div className="w-full actions mt-2">
              <div className="w-full actions-email mt-2">
                <LoginForm message="Have a password? Login with your email address" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
