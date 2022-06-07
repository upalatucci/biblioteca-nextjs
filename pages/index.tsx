import Head from "next/head";
import React, { useEffect, useState } from "react";
import ImageWithTextOverlay from "../components/ImageWithTextOverlay";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeNavbar from "../components/Navbar/HomeNavbar";

import raccoltaVol1 from "../public/raccolta-nichiren-vol1.jpeg";
import raccoltaVol2 from "../public/raccolta-nichiren-vol2.jpeg";
import sutraDelLoto from "../public/sutra-del-loto.jpeg";
import sfogliaGlossario from "../public/sfoglia.jpeg";
import ascolta from "../public/ascolta.jpeg";
import Link from "next/link";
import SearchInput from "../components/SearchInput";
import { useRouter } from "next/router";

const responsive = {
  0: { items: 1.3 },
  700: { items: 2.3 },
};

const books = [
  <ImageWithTextOverlay
    image={raccoltaVol1}
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="Le lettere che il Daishonin inviava ai suoi discepoli"
    width={475}
    height={530}
  />,

  <ImageWithTextOverlay
    image={raccoltaVol2}
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="Le lettere che il Daishonin inviava ai suoi discepoli"
    width={475}
    height={530}
  />,

  <ImageWithTextOverlay
    image={sutraDelLoto}
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="Le lettere che il Daishonin inviava ai suoi discepoli"
    width={475}
    height={530}
  />,
];

const presentationItems = [
  <ImageWithTextOverlay
    image={sfogliaGlossario}
    title="Sfoglia il glossario"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ipsum urna."
    width={800}
    height={700}
  />,
  <ImageWithTextOverlay
    width={800}
    height={700}
    image={ascolta}
    title="Ascolta la Raccolta degli Scritti di Nichiren Daishonin"
    description="Nam eu ipsum urna. Aenean odio nulla, mattis sit amet ipsum vel, commodo porttitor metus."
  />,
];

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchText ? { q: searchText } : null;

    router.push({
      pathname: "/ricerca",
      query,
    });
  };

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", onResize);

    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <Head>
        <title>NICHIREN Library</title>
      </Head>

      <div>
        <h1>NICHIREN Library</h1>
        <HomeNavbar />

        {isMobile ? (
          <AliceCarousel
            mouseTracking
            items={books}
            responsive={responsive}
            paddingLeft={30}
            paddingRight={30}
            disableButtonsControls
            disableDotsControls
          />
        ) : (
          <section className="books">{books}</section>
        )}

        {isMobile ? (
          <AliceCarousel
            mouseTracking
            items={presentationItems}
            responsive={responsive}
            paddingLeft={30}
            paddingRight={30}
            disableButtonsControls
            disableDotsControls
          />
        ) : (
          <section className="books container">{presentationItems}</section>
        )}

        <section className="section-search blank-section">
          <h2>Cosa vuoi approfondire oggi?</h2>
          <div className="simple-search">
            <form onSubmit={onSearch}>
              <SearchInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="primary" type="submit">
                Cerca
              </button>
            </form>
          </div>

          <Link href="/ricerca-avanzata" passHref>
            <span className="advanced-search">
              Vai alla ricerca avanzata <span>{">"}</span>
            </span>
          </Link>
        </section>

        <section className="section-nichiren-library">
          <h2>Che cos&apos;è la Nichiren Library</h2>
          <p>
            Praesent vel urna turpis. Aenean ultrices pharetra justo quis
            ultricies. Vestibulum imperdiet aliquam interdum. Nunc laoreet eget
            metus vitae semper. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Aliquam consectetur
            interdum velit in gravida. Sed eget sapien odio. Vivamus tincidunt
            dictum lorem, sollicitudin varius enim condimentum ac. Vestibulum
            sit amet arcu nulla. Nullam vitae libero ullamcorper, mollis massa
            vel, malesuada elit. Nulla vulputate ex a ligula mollis pharetra.
          </p>
          <button className="secondary">Approfondisci</button>
        </section>
      </div>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const posts = await getPosts();
//   return {
//     props: {
//       posts,
//     },
//   };
// };
