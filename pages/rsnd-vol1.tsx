import Head from "next/head";
import BookDescription from "../components/BookDescription";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import jsonData from "../books/rsnd1.json";
import GoshoList from "../components/GoshoList";
import Footer from "../components/Footer";

export default function RSND1() {
  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <HomeNavbar />
      <main>
        <BookDescription
          index={[
            "Prefazione di Daisaku Ikeda all'edizione italiana",
            "Prefazione",
            {
              title: "Introduzione",
              paragraphs: [
                "Panorama storico",
                "Panorama culturale e religioso",
              ],
            },
            "Note dei traduttori",
            {
              title: "Appendici",
              paragraphs: [
                "A. Scritti contenuti in questo volume e loro titoli giapponesi",
                "B",
                "C",
                "E",
                "F",
                "G",
                "H",
                "I",
                "L",
                "M",
                "N",
              ],
            },
          ]}
        />
        <GoshoList jsonData={jsonData} />
      </main>
      <Footer />
    </>
  );
}
