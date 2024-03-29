import Head from "next/head";
import Link from "next/link";

const PageNotFound = () => (
  <>
    <Head>
      <title>Pagina non trovata | La Biblioteca di Nichiren</title>

      <meta
        name="robots"
        content="noindex, nofollow"
        data-react-helmet="true"
      ></meta>
    </Head>

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
              <Link href="/" className="text-primary hover:text-primaryHover">
                Torna alla pagina iniziale!
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default PageNotFound;
