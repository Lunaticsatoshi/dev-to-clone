import type { NextPage } from "next";

import { RegisterForm } from "src/modules";
import { Layout } from "src/components";

import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaGithub } from "react-icons/fa";

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Register">
      <div className="auth-container flex flex-wrap">
        <div className="auth-container__content registration flex flex-col justify-between items-center">
          <div className="auth-container-header flex flex-col justify-center items-center text-center">
            <h1 className="title text-3xl font-bold">
              Welcome to Dev community
            </h1>
            <div className="description text-base">
              DEV Community is a community of 795,483 amazing developers
            </div>
          </div>
          <div className="w-full actions mt-2">
          <div className="actions-oauth flex justify-center items-center flex-col">
              <div className="oauth google-auth flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <FcGoogle size="1.3rem"/> <div className="oauth__label">Continue with Google</div>
                </div>
              </div>
              <div className="oauth github-auth flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <FaGithub size="1.3rem"/> <div className="oauth__label">Continue with Github</div>
                </div>
              </div>
              <div className="oauth twitter-auth flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <FaTwitter size="1.3rem"/> <div className="oauth__label">Continue with Twitter</div>
                </div>
              </div>
            </div>
            <div className="w-full actions-email mt-2">
              <RegisterForm message="Already have an account?" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
