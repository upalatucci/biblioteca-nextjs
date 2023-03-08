import Head from "next/head";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeNavbar from "@components/Navbar/HomeNavbar";

import raccoltaVol1 from "../public/rsnd-I.svg";
import raccoltaVol2 from "../public/rsnd-II.svg";
import sutraDelLoto from "../public/sutra-del-loto.jpg";
import sfogliaGlossario from "../public/sfoglia.jpeg";
import ascolta from "../public/ascolta.jpeg";
import SearchInput from "@components/SearchInput";
import { useRouter } from "next/router";
import Footer from "@components/Footer";
import ImageWithText from "@components/ImageWithText";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

const responsive = {
  0: { items: 1.2 },
  450: { items: 1.3 },
  700: { items: 2.3 },
};

const books = [
  <ImageWithText
    image={raccoltaVol1}
    path="rsnd-vol1"
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="VOLUME I"
    width={400}
    height={600}
    key={1}
  />,

  <ImageWithText
    image={raccoltaVol2}
    path="rsnd-vol2"
    title="Raccolta degli Scritti di Nichiren Daishonin"
    description="VOLUME II"
    width={400}
    height={600}
    key={2}
  />,

  <ImageWithText
    image={sutraDelLoto}
    path="sutra-del-loto"
    title="Sutra del Loto"
    width={400}
    height={600}
    key={3}
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
        <title>Home | La Biblioteca di Nichiren</title>
      </Head>

      <HomeNavbar />

      <main>
        <section
          className={classNames(
            "w-full bg-white shadow-md rounded-3xl py-20 lg:py-32 ",
            { "px-8": !isMobile }
          )}
        >
          <div className="max-w-[1400px] mx-auto flex justify-evenly">
            {isMobile ? (
              <AliceCarousel
                mouseTracking
                items={books}
                responsive={responsive}
                paddingLeft={10}
                paddingRight={10}
                disableButtonsControls
                disableDotsControls
              />
            ) : (
              <>{books}</>
            )}
          </div>
        </section>

        <section className="font-sans flex flex-col py-20 lg:py-32 px-8 items-center justify-center">
          <h2 className="font-serif mt-4 mb-8 font-bold text-2xl sm:text-3xl md:text-5xl text-center">
            Cosa vuoi approfondire oggi?
          </h2>
          <div className="w-full mt-4 mb-8">
            <form
              onSubmit={onSearch}
              className="flex flex-col items-center w-full"
            >
              <SearchInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required
              />
              <button
                className="btn bg-primary hover:bg-primaryHover rounded-3xl w-36 h-10 mt-10 text-white text-lg"
                type="submit"
              >
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

        <section className="bg-white shadow-md rounded-3xl m-0 py-20 lg:py-32 px-8">
          <div className="max-w-[1400px] mx-auto flex flex-col items-center lg:items-stretch md:flex-row md:justify-evenly gap-10">
            <div className="relative flex-1 text-center w-full max-w-[400px] md:max-w-[30%] 2xl:max-w-[450px] sm:w-[450px] md:w-[500px] lg:w-[500px]">
              <div className="z-0 bg-defaultBg rounded-xl shadow-md absolute top-20 bottom-0 -right-4 -left-4 sm:-right-10 sm:-left-10"></div>
              <Link href="/">
                <a>
                  <div className="z-10">
                    <div className="">
                      <Image
                        src={sfogliaGlossario}
                        alt="Sfoglia il glossario"
                        layout="responsive"
                        width={800}
                        height={700}
                        objectFit="cover"
                        className="pointer-events-none rounded-xl"
                      />
                    </div>
                    <div>
                      <div className="font-serif flex flex-col justify-end text-left pt-6 pb-8 ">
                        <h3 className="font-serif z-10 lg:text-lg font-bold">
                          Sfoglia il glossario
                        </h3>
                        <span className="z-10">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam eu ipsum urna
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>

            <div className="relative flex-1 text-center w-full max-w-[400px] md:max-w-[30%] 2xl:max-w-[450px] sm:w-[450px] md:w-[500px] lg:w-[500px]">
              <div className="z-0 bg-defaultBg rounded-xl shadow-md absolute top-20 bottom-0 -right-4 -left-4 sm:-right-10 sm:-left-10"></div>
              <Link href="/">
                <a>
                  <div className="z-10">
                    <div className="">
                      <Image
                        src={ascolta}
                        alt="Ascolta la Raccolta degli Scritti di Nichiren Daishonin"
                        layout="responsive"
                        width={800}
                        height={700}
                        objectFit="cover"
                        className="pointer-events-none rounded-xl"
                      />
                    </div>
                    <div>
                      <div className="font-serif flex flex-col justify-end text-left pt-6 pb-8 ">
                        <h3 className="z-10 lg:text-lg font-bold">
                          Ascolta la Raccolta degli Scritti di Nichiren
                          Daishonin
                        </h3>
                        <span className="z-10">
                          Nam eu ipsum urna. Aenean odio nulla,
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 px-8">
          <div className="font container mx-auto flex flex-col items-center justify-center">
            <h2 className="font-bold my-8 text-3xl md:text-5xl text-center">
              Che cos&apos;è La Biblioteca di Nichiren
            </h2>
            <p className="text-2xl font-serif text-center mx-4 md:mx-32 lg:mx-64">
              Praesent vel urna turpis. Aenean ultrices pharetra justo quis
              ultricies. Vestibulum imperdiet aliquam interdum. Nunc laoreet
              eget metus vitae semper. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Aliquam
              consectetur interdum velit in gravida. Sed eget sapien odio.
              Vivamus tincidunt dictum lorem, sollicitudin varius enim
              condimentum ac. Vestibulum sit amet arcu nulla. Nullam vitae
              libero ullamcorper, mollis massa vel, malesuada elit. Nulla
              vulputate ex a ligula mollis pharetra.
            </p>
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
