import Head from "next/head";
import BookDescription from "@components/BookDescription";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import GoshoListSkeleton from "@components/GoshoList/GoshoListSkeleton";
import GoshoList, { GoshoType } from "@components/GoshoList";
import IntroData from "@books/intro_2.json";
import AppendiceData from "@books/appendice_2.json";

export default function RSND1() {
  const [jsonData, setJSONData] = useState<GoshoType[]>([]);

  useEffect(() => {
    import("@books/rsnd2.json").then((goshoData) => {
      setJSONData(goshoData.default);
    });
  }, []);

  return (
    <>
      <Head>
        <title>RSND Vol. 2 | NICHIREN Library</title>
      </Head>

      <HomeNavbar />
      <main>
        <BookDescription index={IntroData} notes={AppendiceData} />
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
