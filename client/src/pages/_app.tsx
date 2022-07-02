import "src/styles/app.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { AuthContextProvider } from "src/contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
          <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
