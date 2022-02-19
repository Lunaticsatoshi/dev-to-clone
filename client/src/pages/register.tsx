import type { NextPage } from "next";

import { RegisterForm } from "src/modules";
import { Layout } from "src/components";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Layout title="Register">
        <div className="auth-container flex flex-wrap">
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
                <RegisterForm message="Already have an account?" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;
