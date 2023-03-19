import Head from "next/head";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import Link from "next/link";

const PageNotFound = () => (
  <>
    <Head>
      <title>Offline | La Biblioteca di Nichiren</title>

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
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Offline</h2>

          <hr className="border border-secondary mt-6" />
          <div className="py-4">
            <p className="text-xl">
              Non puoi accedere a questo contenuto perche&#39; al momento sei
              offline
            </p>
            <Link href="/">
              <a className="text-primary hover:text-primaryHover">
                Torna alla pagina iniziale!
              </a>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default PageNotFound;
