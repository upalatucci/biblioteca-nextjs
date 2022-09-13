import Head from "next/head";
import BookDescription from "../components/BookDescription";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import raccoltaNichirenVol1 from "../public/raccolta-nichiren-vol1.jpeg";
import jsonData from "../books/rsnd1.json";
import GoshoList from "../components/GoshoList";

export default function Ricerca() {
  return (
    <>
      <Head>
        <title>NICHIREN Library | Ricerca</title>
      </Head>

      <div>
        <h1>NICHIREN Library</h1>
        <HomeNavbar />
        <BookDescription
          image={raccoltaNichirenVol1}
          imageAlt="Raccolta degli scritti di Nichiren Daishonin"
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
      </div>
    </>
  );
}
