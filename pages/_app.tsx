import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import "../styles/globals.scss";
import { FontSizeProvider } from "contexts/FontSizeContext";
import iconArrowTop from "@public/icons/ico-arrow-top.svg";
import Image from "next/image";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import CookieBanner from "@components/CookieBanner";
import useCookiePolicy from "@hooks/useCookiePolicy";

import { Roboto, Bitter } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "500", "700"],
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [showArrow, setShowArrow] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const { cookiePolicy } = useCookiePolicy();

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

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    setShowArrow(false);
  }, []);

  return (
    <FontSizeProvider>
      <QueryClientProvider client={queryClient}>
        <div
          className={`app-container ${roboto.variable} ${bitter.variable} ${bitter.className}`}
        >
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>

          <button
            className={classNames(
              "rounded-full shadow-lg z-10 fixed items-center justify-center w-10 h-10 bottom-10 right-10 bg-defaultBg hover:scale-110 flex scale-0 print:hidden",
              { "scale-100": showArrow }
            )}
            onClick={scrollToTop}
          >
            <Image src={iconArrowTop} width={20} height={20} alt="arrow top" />
          </button>

          {cookiePolicy === undefined && showCookieBanner && (
            <CookieBanner onClose={() => setShowCookieBanner(false)} />
          )}
        </div>
      </QueryClientProvider>
    </FontSizeProvider>
  );
}

export default MyApp;
