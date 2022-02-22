import { FC } from "react";
import { useRouter } from "next/router";

import { userTokenPersistence } from "src/utils";

const withAuth = <T extends object>(WrappedComponent: FC<T>) => {
  const WithAuth: FC<T> = (props: T) => {
    const router = useRouter();
    if (typeof window !== "undefined") {
      const authTokens = userTokenPersistence.get();

      if (!authTokens) {
        router.push("/login");
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return WithAuth;
};

export default withAuth;
