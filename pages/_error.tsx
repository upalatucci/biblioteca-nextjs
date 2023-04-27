import Footer from "@components/Footer";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import { FallbackRender } from "@sentry/nextjs/types/client";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

export const ErrorSection: FC<{
  error?: Error;
  componentStack?: string;
  eventId?: string;
  resetError?: () => void;
}> = ({ error, componentStack, resetError }) => (
  <section className="bg-white" id="dictionary">
    <div className="container mx-auto py-8 px-4 min-h-[60vh]">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">
        Oops, si e&apos; verificato un errore improvviso! {error?.toString()}
      </h2>

      <hr className="border border-secondary mt-6" />
      <div className="py-4">
        {resetError ? (
          <p className="text-xl">
            <button
              className="btn text-primary hover:text-primaryHover"
              onClick={resetError}
            >
              Vogliamo riporvare di nuovo?
            </button>
          </p>
        ) : (
          <Link href="/" className="text-primary hover:text-primaryHover">
            Vogliamo riporvare di nuovo?
          </Link>
        )}

        {componentStack && (
          <details className="mt-4">
            <summary className="text-xl">
              <span className="text-primary hover:text-primaryHover">
                Maggiori informazioni
              </span>
            </summary>
            <pre className="text-sm">{componentStack}</pre>
          </details>
        )}

        <p>
          Se il problema persiste, per favore contattaci all&apos;indirizzo{" "}
          <a
            className="text-primary hover:text-primaryHover"
            href="mailto:webmaster@sgi-italia.org"
          >
            webmaster@sgi-italia.org
          </a>
        </p>
      </div>
    </div>
  </section>
);

const ErrorPage: FallbackRender = () => (
  <>
    <Head>
      <title>Errore | La Biblioteca di Nichiren</title>
      <meta
        name="robots"
        content="noindex, nofollow"
        data-react-helmet="true"
      ></meta>
    </Head>

    <main>
      <ErrorSection />
    </main>
  </>
);

export default ErrorPage;
