import { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthState } from "src/hooks";
import { userTokenPersistence } from "src/utils";

type AuthLayoutProps = {
  children: JSX.Element;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { currentUser } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    const authTokens = userTokenPersistence.get();
    if (authTokens) {
      router.push("/");
      currentUser();
    } else router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default AuthLayout;
