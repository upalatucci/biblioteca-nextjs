import fetch from "node-fetch";
import fs from "fs";

async function getGlossario() {
  let page = 1;
  let totalPosts = [];

  while (true) {
    const postsResponse = await fetch(
      `https://biblioteca.sgi-italia.org/wp-json/wp/v2/glossario?per_page=100&page=${page}`
    );
    const posts = await postsResponse.json();

    totalPosts = [...totalPosts, ...posts];

    const totalPages = postsResponse.headers.get("x-wp-totalpages");

    if (!totalPages || (totalPages && parseInt(totalPages, 10) === page)) {
      return totalPosts;
    } else {
      page++;
      console.log("Total posts fetched", totalPosts.length);
    }
  }
}

getGlossario().then((posts) => {
  const json = posts
    .map((post) => ({
      title: post.title.rendered,
      content: post.content.rendered
    }))
    .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

  fs.writeFile(
    `./books/glossario.json`,
    JSON.stringify(json),
    (err) => err && console.error(err)
  );
});
