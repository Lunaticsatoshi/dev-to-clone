import { FC } from "react";
import { useRouter } from "next/router";

import { useAuthState } from "src/hooks";
import { userTokenPersistence } from "src/utils";

const withAuth = <T extends object>(WrappedComponent: FC<T>) => {
  const WithAuth: FC<T> = (props: T) => {
    const router = useRouter();
    const { currentUser } = useAuthState();
    if (typeof window !== "undefined") {
      const authTokens = userTokenPersistence.get();

      if (!authTokens) {
        router.push("/login");
        return null;
      }
      currentUser();
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return WithAuth;
};

export default withAuth;
