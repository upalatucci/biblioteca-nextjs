import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import "../styles/globals.scss";
import { FontSizeProvider } from "contexts/FontSizeContext";
import iconArrowTop from "@public/icons/ico-arrow-top.svg";
import Image from "next/image";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import CookieBanner from "@components/CookieBanner";

import { Roboto, Bitter } from "next/font/google";
import { ErrorBoundary } from "@sentry/nextjs";
import { ErrorSection } from "./_error";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";

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
          <ErrorBoundary fallback={ErrorSection}>
            <HomeNavbar />
            <Component {...pageProps} />
            <Footer />
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

          <CookieBanner />
        </div>
      </QueryClientProvider>
    </FontSizeProvider>
  );
}

export default MyApp;
