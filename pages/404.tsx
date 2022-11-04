import Head from "next/head";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import Link from "next/link";

const PageNotFound = () => (
  <>
    <Head>
      <title>Pagina non trovata | NICHIREN Library</title>
    </Head>

    <HomeNavbar />
    <main>
      <section className="bg-white" id="dictionary">
        <div className="container mx-auto py-8 px-4 min-h-[60vh]">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Pagina non trovata
          </h2>

          <hr className="border border-secondary mt-6" />
          <div className="py-4">
            <p className="text-xl">
              Ti sei perso?{" "}
              <Link href="/">
                <a className="text-primary hover:text-primaryHover">
                  Torna alla pagina iniziale!
                </a>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default PageNotFound;
