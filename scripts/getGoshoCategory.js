import fetch from "node-fetch";
import fs from "fs";

async function getPosts() {
  let page = 1;
  let totalPosts = [];

  while (true) {
    const postsResponse = await fetch(
      `https://biblioteca.sgi-italia.org/wp-json/wp/v2/posts?per_page=100&page=${page}`
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

getPosts().then((posts) => {
  const postsCategory = posts.filter((post) => post.categories.includes(1));

  console.log(postsCategory[0]);
  const json = postsCategory.map((post) => ({
    title: post.title.rendered,
    slug: post.slug,
  }));

  fs.writeFile("./books/rsnd1.json", JSON.stringify(json), (err) =>
    console.error(err)
  );
});
