import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import ImageWithTextOverlay from "../components/ImageWithTextOverlay";
import HomeNavbar from "../components/Navbar/HomeNavbar";

import PostResults from "../components/PostResults";
import Search from "../components/Search";
import { getPosts } from "../lib/wordpress";
import { mapElasticResultToPost } from "../utils/elasticSearchUtils";
import raccoltaVol1 from "../public/raccolta-nichiren-vol1.jpeg";
import raccoltaVol2 from "../public/raccolta-nichiren-vol2.jpeg";
import sutraDelLoto from "../public/sutra-del-loto.jpeg";
import sfogliaGlossario from "../public/sfoglia.jpeg";
import ascolta from "../public/ascolta.jpeg";
import Link from "next/link";

export default function Home({ posts }) {
  // const [searchedPosts, setSearchedPosts] = useState();

  // const jsxPosts = posts.map((post) => {
  //   return <PostResults post={post} key={post.id} />;
  // });

  // const onSearchPost = async (searchText) => {
  //   const response = await fetch(`/api/search?q=${searchText}`);

  //   const jsonResponse = await response.json();

  //   setSearchedPosts(
  //     mapElasticResultToPost(jsonResponse)?.map((post) => (
  //       <PostResults post={post} key={post.id} />
  //     ))
  //   );
  // };

  return (
    <>
      <Head>
        <title>NICHIREN Library</title>
      </Head>

      <div>
        <h1>NICHIREN Library</h1>
        <HomeNavbar />
        <section className="books container">
          <ImageWithTextOverlay
            image={raccoltaVol1}
            title="Raccolta degli Scritti di Nichiren Daishonin"
            description="Le lettere che il Daishonin inviava ai suoi discepoli"
            width={475}
            height={530}
          />

          <ImageWithTextOverlay
            image={raccoltaVol2}
            title="Raccolta degli Scritti di Nichiren Daishonin"
            description="Le lettere che il Daishonin inviava ai suoi discepoli"
            width={475}
            height={530}
          />

          <ImageWithTextOverlay
            image={sutraDelLoto}
            title="Raccolta degli Scritti di Nichiren Daishonin"
            description="Le lettere che il Daishonin inviava ai suoi discepoli"
            width={475}
            height={530}
          />
        </section>

        <section className="books container">
          <ImageWithTextOverlay
            image={sfogliaGlossario}
            title="Sfoglia il glossario"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ipsum urna."
            width={800}
            height={700}
          />
          <ImageWithTextOverlay
            width={800}
            height={700}
            image={ascolta}
            title="Ascolta la Raccolta degli Scritti di Nichiren Daishonin"
            description="Nam eu ipsum urna. Aenean odio nulla, mattis sit amet ipsum vel, commodo porttitor metus."
          />
        </section>

        <section className="section-search">
          <h2>Cosa vuoi approfondire oggi?</h2>
          <div className="simple-search">
            <input type="search" placeholder="Inserisci la parola o frase..." />
            <button className="primary">Cerca</button>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};
