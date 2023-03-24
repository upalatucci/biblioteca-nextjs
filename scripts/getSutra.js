import fetch from "node-fetch";
import fs from "fs";

async function getPosts() {
  let page = 1;
  let totalPosts = [];

  while (true) {
    const postsResponse = await fetch(
      `https://biblioteca-wp.sgi-italia.org/wp-json/wp/v2/sdlpe?per_page=100&page=${page}`
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

const INTRO_CAT_ID = 18;

getPosts().then((posts) => {
  console.log(posts[0]);

  const json = posts
    .filter((post) => !post.cat_sdlpe.includes(INTRO_CAT_ID))
    .map((post) => ({
      title: post.title.rendered,
      slug: post.slug,
      category: post.cat_sdlpe,
      number: post.menu_order,
      number: Number(post.acf.acf_numero),
    }));

  fs.writeFile("./books/sdl.json", JSON.stringify(json), (err) =>
    console.error(err)
  );

  const jsonIntro = posts
    .filter((post) => post.cat_sdlpe.includes(INTRO_CAT_ID))
    .map((post) => ({
      title: post.title.rendered,
      slug: post.slug,
      category: post.cat_sdlpe,
      number: Number(post.acf.acf_numero),
    }));

  fs.writeFile("./books/intro_sdl.json", JSON.stringify(jsonIntro), (err) =>
    console.error(err)
  );
});
