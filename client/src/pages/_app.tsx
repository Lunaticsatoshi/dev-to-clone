import "src/styles/app.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { AuthContextProvider } from "src/contexts";
import { AuthLayout } from "src/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
