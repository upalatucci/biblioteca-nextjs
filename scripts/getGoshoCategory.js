import fetch from "node-fetch";
import fs from "fs";

const RSND_VOL_2_CATEGORY_ID = 17;
const RSND_VOL_1_CATEGORY_ID = 16;
const RSND_APPENDICE_CAT_ID = 19;
const RSND_INTRO_1_CAT_ID = 21;
const RSND_INTRO_2_CAT_ID = 22;

async function getPosts() {
  let page = 1;
  let totalPosts = [];

  while (true) {
    const postsResponse = await fetch(
      `https://biblioteca.sgi-italia.org/wp-json/wp/v2/rsnd?per_page=100&page=${page}`
    );
    const posts = await postsResponse.json();

    totalPosts = [...totalPosts, ...posts];

    const totalPages = postsResponse.headers.get("x-wp-totalpages");

    if (!totalPages || (totalPages && parseInt(totalPages, 10) === page)) {
      return totalPosts;
    }
    page++;
    console.log("Total posts fetched", totalPosts.length);
  }
}

getPosts().then((posts) => {
  const gosho = posts.filter((post) => post.acf.acf_numero);
  const rsnd1 = gosho.filter((post) =>
    post.cat_rsnd.includes(RSND_VOL_1_CATEGORY_ID)
  );
  const rsnd2 = gosho.filter((post) =>
    post.cat_rsnd.includes(RSND_VOL_2_CATEGORY_ID)
  );

  let json = rsnd1.map((post) => ({
    title: post.title.rendered,
    slug: post.slug,
    recipient: post.acf.acf_destinatario || "",
    place: post.acf.acf_luogo || "",
    date: post.acf.acf_data || "",
    number: Number(post.acf.acf_numero)
  }));

  fs.writeFile("./books/rsnd1.json", JSON.stringify(json), (err) =>
    console.error(err)
  );

  json = rsnd2.map((post) => ({
    title: post.title.rendered,
    slug: post.slug,
    recipient: post.acf.acf_destinatario || "",
    place: post.acf.acf_luogo || "",
    date: post.acf.acf_data || "",
    number: Number(post.acf.acf_numero)
  }));

  fs.writeFile("./books/rsnd2.json", JSON.stringify(json), (err) =>
    console.error(err)
  );

  const appendice_vol_1 = posts.filter(
    (post) =>
      post.cat_rsnd.includes(RSND_VOL_1_CATEGORY_ID) &&
      post.cat_rsnd.includes(RSND_APPENDICE_CAT_ID)
  );

  json = appendice_vol_1.map((post) => ({
    title: post.title.rendered,
    slug: post.slug
  }));

  fs.writeFile("./books/appendice_1.json", JSON.stringify(json), (err) =>
    console.error(err)
  );

  const appendice_vol_2 = posts.filter(
    (post) =>
      post.cat_rsnd.includes(RSND_VOL_2_CATEGORY_ID) &&
      post.cat_rsnd.includes(RSND_APPENDICE_CAT_ID)
  );

  json = appendice_vol_2.map((post) => ({
    title: post.title.rendered,
    slug: post.slug
  }));

  fs.writeFile("./books/appendice_2.json", JSON.stringify(json), (err) =>
    console.error(err)
  );

  const intro_1 = posts.filter((post) =>
    post.cat_rsnd.includes(RSND_INTRO_1_CAT_ID)
  );

  json = intro_1.map((post) => ({
    title: post.title.rendered,
    slug: post.slug
  }));

  fs.writeFile("./books/intro_1.json", JSON.stringify(json), (err) =>
    console.error(err)
  );

  const intro_2 = posts.filter((post) =>
    post.cat_rsnd.includes(RSND_INTRO_2_CAT_ID)
  );

  json = intro_2.map((post) => ({
    title: post.title.rendered,
    slug: post.slug
  }));

  fs.writeFile("./books/intro_2.json", JSON.stringify(json), (err) =>
    console.error(err)
  );
});
