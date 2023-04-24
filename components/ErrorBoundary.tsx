import Head from "next/head";
import { Component, PropsWithChildren } from "react";
import HomeNavbar from "./Navbar/HomeNavbar";
import Link from "next/link";
import Footer from "./Footer";

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  PropsWithChildren<unknown>,
  ErrorBoundaryState
> {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <Head>
            <title>Errore | La Biblioteca di Nichiren</title>
            <meta
              name="robots"
              content="noindex, nofollow"
              data-react-helmet="true"
            ></meta>
          </Head>

          <HomeNavbar />
          <main>
            <section className="bg-white" id="dictionary">
              <div className="container mx-auto py-8 px-4 min-h-[60vh]">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Oops, si e&apos; verificato un errore improvviso!
                </h2>

                <hr className="border border-secondary mt-6" />
                <div className="py-4">
                  <p className="text-xl">
                    <Link
                      href="/"
                      className="text-primary hover:text-primaryHover"
                      onClick={() => this.setState({ hasError: false })}
                    >
                      Vogliamo riporvare di nuovo?
                    </Link>
                  </p>

                  <p>
                    Se il problema persiste, per favore contattaci
                    all&apos;indirizzo{" "}
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
          </main>
          <Footer />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
