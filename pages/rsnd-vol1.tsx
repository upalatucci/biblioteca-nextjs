import Head from "next/head";
import BookDescription from "@components/BookDescription";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import GoshoListSkeleton from "@components/GoshoList/GoshoListSkeleton";
import GoshoList, { GoshoType } from "@components/GoshoList";
import IntroData from "@books/intro_1.json";
import AppendiceData from "@books/appendice_1.json";

export default function RSND1() {
  const [jsonData, setJSONData] = useState<GoshoType[]>([]);

  useEffect(() => {
    import("@books/rsnd1.json").then((goshoData) => {
      return setJSONData(goshoData.default);
    });
  }, []);

  return (
    <>
      <Head>
        <title>RSND Vol. 1 | NICHIREN Library</title>
      </Head>

      <HomeNavbar />
      <main>
        {IntroData && (
          <BookDescription index={IntroData} notes={AppendiceData} />
        )}
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
