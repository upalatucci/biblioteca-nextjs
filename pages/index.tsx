import Head from "next/head";
import React, { useEffect, useState } from "react";
import ImageWithTextOverlay from "@components/ImageWithTextOverlay";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeNavbar from "@components/Navbar/HomeNavbar";

import raccoltaVol1 from "../public/raccolta-nichiren-vol1.jpeg";
import raccoltaVol2 from "../public/raccolta-nichiren-vol2.jpeg";
import sutraDelLoto from "../public/sutra-del-loto.jpeg";
import sfogliaGlossario from "../public/sfoglia.jpeg";
import ascolta from "../public/ascolta.jpeg";
import Link from "next/link";
import SearchInput from "@components/SearchInput";
import { useRouter } from "next/router";
import Footer from "@components/Footer";

const responsive = {
  0: { items: 1.3 },
  700: { items: 2.3 }
};

const books = [
  <ImageWithTextOverlay
    image={raccoltaVol1}
    path="rsnd-vol1"
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="Le lettere che il Daishonin inviava ai suoi discepoli"
    width={475}
    height={530}
    key={1}
  />,

  <ImageWithTextOverlay
    image={raccoltaVol2}
    path="rsnd-vol1"
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="Le lettere che il Daishonin inviava ai suoi discepoli"
    width={475}
    height={530}
    key={2}
  />,

  <ImageWithTextOverlay
    image={sutraDelLoto}
    path="rsnd-vol1"
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="Le lettere che il Daishonin inviava ai suoi discepoli"
    width={475}
    height={530}
    key={3}
  />
];

const presentationItems = [
  <ImageWithTextOverlay
    image={sfogliaGlossario}
    title="Sfoglia il glossario"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ipsum urna."
    width={800}
    height={700}
    key={4}
  />,
  <ImageWithTextOverlay
    width={800}
    height={700}
    image={ascolta}
    title="Ascolta la Raccolta degli Scritti di Nichiren Daishonin"
    description="Nam eu ipsum urna. Aenean odio nulla, "
    key={5}
  />
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
      query
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

        <HomeNavbar />

        <main>
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
          <section className="w-full flex items-center justify-evenly m-0 p-0 lg:mb-4 xl:mb-8">{books}</section>
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
          <section className="w-full flex items-center justify-evenly m-0 p-0">{presentationItems}</section>
        )}

        <section className="bg-white px-4 flex flex-col py-14 items-center justify-center">
          <h2 className="mt-4 mb-8 font-bold text-2xl sm:text-3xl md:text-4xl text-center">Cosa vuoi approfondire oggi?</h2>
          <div className="w-full mt-4 mb-8">
            <form onSubmit={onSearch} className='flex flex-col items-center w-full'>
              <SearchInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn bg-primary hover:bg-primaryHover rounded-3xl w-36 h-10 mt-10 text-white text-lg" type="submit">
                Cerca
              </button>
            </form>
          </div>

          {/* <Link href="/ricerca-avanzata" passHref>
            <a className="text-lg">
              <span>Vai alla ricerca avanzata <span>{">"}</span></span>
            </a>
          </Link> */}
        </section>

        <section className="py-14">
          <div className="container px-4 mx-auto flex flex-col items-center justify-center my-16">
          <h2 className="font-bold my-8  text-3xl md:text-4xl text-center">Che cos&apos;è la Nichiren Library</h2>
          <p className="text-center mx-4 md:mx-32 lg:mx-64 mb-12">
            Praesent vel urna turpis. Aenean ultrices pharetra justo quis
            ultricies. Vestibulum imperdiet aliquam interdum. Nunc laoreet eget
            metus vitae semper. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Aliquam consectetur
            interdum velit in gravida. Sed eget sapien odio. Vivamus tincidunt
            dictum lorem, sollicitudin varius enim condimentum ac. Vestibulum
            sit amet arcu nulla. Nullam vitae libero ullamcorper, mollis massa
            vel, malesuada elit. Nulla vulputate ex a ligula mollis pharetra.
          </p>
          <button className="btn border border-secondary text-secondary hover:text-white hover:bg-secondary rounded-3xl py-2 px-16">Approfondisci</button>
          </div>
        </section>
        <Footer />
      </main>
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
