import "src/styles/app.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";

import { AuthContextProvider } from "src/contexts";
import { queryClient } from "src/client/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
