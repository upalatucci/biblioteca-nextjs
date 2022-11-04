import Head from "next/head";
import BookDescription from "@components/BookDescription";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import GoshoListSkeleton from "@components/GoshoList/GoshoListSkeleton";
import GoshoList, { GoshoType } from "@components/GoshoList";

export default function RSND1() {
  const [jsonData, setJSONData] = useState<GoshoType[]>([]);

  useEffect(() => {
    import("@books/rsnd1.json").then((goshoData) => {
      setJSONData(goshoData.default);
    });
  }, []);

  return (
    <>
      <Head>
        <title>RSND Vol. 1 | NICHIREN Library</title>
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
          ]}
          notes={{
            title: "Appendici",
            paragraphs: [
              "A. Scritti contenuti in questo volume e loro titoli giapponesi",
              "B. Destinatari e scritti da loro ricevuti",
              "C. Nomi di persona sanscriti e loro equivalenti giapponesi",
              "D. Nomi di persona cinesi e loro equivalenti giapponesi",
              "E. Nomi di persona italiani e loro equivalenti giapponesi",
              "F. Nomi di persona giapponesi e loro equivalenti sanscriti, cinesi o italiani",
              "G. Opere citate nel testo e loro titoli giapponesi",
              "H. Titoli giapponesi delle opere citate nel testo",
              "I. Titoli dei capitoli del Sutra del Loro e loro forme abbreviate",
              "L. Nomi delle scuole buddiste",
              "M. Eventi nella vita di Nichiren Daishonin",
              "N. Luoghi correlati a Nichiren Daishonin",
            ],
          }}
        />
        {jsonData.length > 0 ? (
          <GoshoList jsonData={jsonData} />
        ) : (
          <GoshoListSkeleton />
        )}
      </main>
      <Footer />
    </>
  );
}
