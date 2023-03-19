import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import "../styles/globals.scss";
import { FontSizeProvider } from "contexts/FontSizeContext";
import iconArrowTop from "@public/icons/ico-arrow-top.svg";
import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";
import ErrorBoundary from "@components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FontSizeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app-container">
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>

          <button
            className={classNames(
              "rounded-full shadow-lg z-10 fixed items-center justify-center w-10 h-10 bottom-10 right-10 bg-defaultBg hover:scale-110 flex scale-0 print:hidden",
              { "scale-100": showArrow }
            )}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Image src={iconArrowTop} width={20} height={20} alt="arrow top" />
          </button>
        </div>
      </QueryClientProvider>
    </FontSizeProvider>
  );
}

export default MyApp;
