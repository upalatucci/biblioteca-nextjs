import Head from "next/head";
import Image from "next/image";
import BookDescription from "../components/BookDescription";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import raccoltaNichirenVol1 from "../public/raccolta-nichiren-vol1.jpeg";

export default function Ricerca() {
  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <div className="search-page">
        <h1>NICHIREN Library</h1>
        <HomeNavbar />
        <BookDescription
          image={raccoltaNichirenVol1}
          imageAlt="Raccolta degli scritti di Nichiren Daishonin"
          index={[
            "Prefazione di Daisaku Ikeda all'edizione italiana",
            "Prefazione",
            "Introduzione",
          ]}
        />
        <section className="container blank-section">
          <h2>Scritti</h2>
        </section>
      </div>
    </>
  );
}
