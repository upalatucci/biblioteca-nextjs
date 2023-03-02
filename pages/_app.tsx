import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import "../styles/globals.scss";
import { FontSizeProvider } from "contexts/FontSizeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FontSizeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app-container">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </FontSizeProvider>
  );
}

export default MyApp;
