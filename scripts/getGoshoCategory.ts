import { PrismaClient } from "@prisma/client";
import { parsePHP } from "../utils/parsePHP";
const prisma = new PrismaClient();
import fs from "fs";

const RSND_VOL_2_CATEGORY_ID = 17;
const RSND_VOL_1_CATEGORY_ID = 16;
const RSND_APPENDICE_CAT_ID = 19;
const RSND_INTRO_1_CAT_ID = 21;
const RSND_INTRO_2_CAT_ID = 22;

async function init() {
  console.time("timer");
  const posts = await prisma.d1b1_posts.findMany({
    where: {
      post_type: "rsnd",
      d1b1_term_relationships: {
        every: {
          AND: { term_taxonomy_id: RSND_VOL_1_CATEGORY_ID },
          NOT: [
            {
              term_taxonomy_id: RSND_APPENDICE_CAT_ID,
            },
            { term_taxonomy_id: RSND_INTRO_1_CAT_ID },
          ],
        },
      },
    },
    include: {
      d1b1_term_relationships: {
        select: {
          term_taxonomy_id: true,
        },
      },
      d1b1_postmeta: {
        select: {
          meta_value: true,
          meta_key: true,
        },
        where: {
          meta_key: {
            in: [
              "acf_numero",
              "acf_cenni_storici",
              "acf_note",
              "acf_destinatario",
              "acf_luogo",
              "acf_data",
            ],
          },
        },
      },
    },
  });

  type ACFType = { [key in string]: string };

  const postsWithAcf = posts.map((post) => ({
    ...post,
    acf: post.d1b1_postmeta.reduce((acc, metadata) => {
      const value = metadata.meta_value.includes("{")
        ? parsePHP(metadata.meta_value)
        : metadata.meta_value;

      acc[metadata.meta_key] = value;

      if (metadata.meta_key === "acf_destinatario" && typeof value === "string")
        acc[metadata.meta_key] = [value];

      return acc;
    }, {}),
    cat: post.d1b1_term_relationships.map((term) =>
      Number(term.term_taxonomy_id)
    ),
  }));

  // const rsnd2 = postsWithAcf.filter(
  //   (post) =>
  //     post.cat.includes(RSND_VOL_2_CATEGORY_ID) &&
  //     !post.cat.includes(RSND_APPENDICE_CAT_ID) &&
  //     !post.cat.includes(RSND_INTRO_2_CAT_ID)
  // );

  console.log(postsWithAcf.at(-1));

  const json = postsWithAcf.map((post) => ({
    title: post.post_title,
    slug: post.post_name,
    recipient: post.acf["acf_destinatario"] || "",
    place: post.acf["acf_luogo"] || "",
    date: post.acf["acf_data"] || "",
    number: Number(post.acf["acf_numero"]),
  }));

  fs.writeFile("./books/rsnd1.json", JSON.stringify(json), (err) =>
    console.error(err)
  );
  console.timeEnd("timer");

  // async function getPosts() {
  //   let page = 1;
  //   let totalPosts = [];

  //   while (true) {
  //     const postsResponse = await fetch(
  //       `https://biblioteca.sgi-italia.org/wp-json/wp/v2/rsnd?per_page=100&page=${page}`
  //     );
  //     const posts = await postsResponse.json();

  //     totalPosts = [...totalPosts, ...posts];

  //     const totalPages = postsResponse.headers.get("x-wp-totalpages");

  //     if (!totalPages || (totalPages && parseInt(totalPages, 10) === page)) {
  //       return totalPosts;
  //     }
  //     page++;
  //     console.log("Total posts fetched", totalPosts.length);
  //   }
  // }

  // getPosts().then((posts) => {

  //   const gosho = posts.filter((post) => post.acf.acf_numero);
  //   const rsnd1 = gosho.filter(
  //     (post) =>
  //       post.cat_rsnd.includes(RSND_VOL_1_CATEGORY_ID) &&
  //       !post.cat_rsnd.includes(RSND_APPENDICE_CAT_ID) &&
  //       !post.cat_rsnd.includes(RSND_INTRO_1_CAT_ID)
  //   );
  //   const rsnd2 = gosho.filter(
  //     (post) =>
  //       post.cat_rsnd.includes(RSND_VOL_2_CATEGORY_ID) &&
  //       !post.cat_rsnd.includes(RSND_APPENDICE_CAT_ID) &&
  //       !post.cat_rsnd.includes(RSND_INTRO_2_CAT_ID)
  //   );

  //   let json = rsnd1.map((post) => ({
  //     title: post.title.rendered,
  //     slug: post.slug,
  //     recipient: post.acf.acf_destinatario || "",
  //     place: post.acf.acf_luogo || "",
  //     date: post.acf.acf_data || "",
  //     number: Number(post.acf.acf_numero)
  //   }));

  //   fs.writeFile("./books/rsnd1.json", JSON.stringify(json), (err) =>
  //     console.error(err)
  //   );

  //   json = rsnd2.map((post) => ({
  //     title: post.title.rendered,
  //     slug: post.slug,
  //     recipient: post.acf.acf_destinatario || "",
  //     place: post.acf.acf_luogo || "",
  //     date: post.acf.acf_data || "",
  //     number: Number(post.acf.acf_numero)
  //   }));

  //   fs.writeFile("./books/rsnd2.json", JSON.stringify(json), (err) =>
  //     console.error(err)
  //   );

  //   const appendice_vol_1 = posts.filter(
  //     (post) =>
  //       post.cat_rsnd.includes(RSND_VOL_1_CATEGORY_ID) &&
  //       post.cat_rsnd.includes(RSND_APPENDICE_CAT_ID)
  //   );

  //   json = appendice_vol_1.map((post) => ({
  //     title: post.title.rendered,
  //     slug: post.slug,
  //     number: Number(post.acf.acf_numero)
  //   }));

  //   fs.writeFile("./books/appendice_1.json", JSON.stringify(json), (err) =>
  //     console.error(err)
  //   );

  //   const appendice_vol_2 = posts.filter(
  //     (post) =>
  //       post.cat_rsnd.includes(RSND_VOL_2_CATEGORY_ID) &&
  //       post.cat_rsnd.includes(RSND_APPENDICE_CAT_ID)
  //   );

  //   json = appendice_vol_2.map((post) => ({
  //     title: post.title.rendered,
  //     slug: post.slug,
  //     number: Number(post.acf.acf_numero)
  //   }));

  //   fs.writeFile("./books/appendice_2.json", JSON.stringify(json), (err) =>
  //     console.error(err)
  //   );

  //   const intro_1 = posts.filter((post) =>
  //     post.cat_rsnd.includes(RSND_INTRO_1_CAT_ID)
  //   );

  //   json = intro_1.map((post) => ({
  //     title: post.title.rendered,
  //     slug: post.slug,
  //     number: Number(post.acf.acf_numero)
  //   }));

  //   fs.writeFile("./books/intro_1.json", JSON.stringify(json), (err) =>
  //     console.error(err)
  //   );

  //   const intro_2 = posts.filter((post) =>
  //     post.cat_rsnd.includes(RSND_INTRO_2_CAT_ID)
  //   );

  //   json = intro_2.map((post) => ({
  //     title: post.title.rendered,
  //     slug: post.slug,
  //     number: Number(post.acf.acf_numero)
  //   }));

  //   fs.writeFile("./books/intro_2.json", JSON.stringify(json), (err) =>
  //     console.error(err)
  //   );
  // });
}

init();
