export async function getPosts(postType = "rsnd") {
  let page = 1;
  let totalPosts = [];

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const postsResponse = await fetch(
      `${process.env.WORDPRESS_API_ENDPOINT}/${postType}?per_page=100&page=${page}`
    );
    // eslint-disable-next-line no-await-in-loop
    const posts = await postsResponse.json();

    totalPosts = [...totalPosts, ...posts];

    const totalPages = postsResponse.headers.get("x-wp-totalpages");

    if (!totalPages || (totalPages && parseInt(totalPages, 10) === page)) {
      return totalPosts;
    }
    page += 1;
    // eslint-disable-next-line no-console
    console.log("Total posts fetched for", postType, totalPosts.length);
  }
}

export async function getPostBySlug(slug, postType = "rsnd") {
  const postsRes = await fetch(
    `${process.env.WORDPRESS_API_ENDPOINT}/${postType}?slug=${slug}`
  );
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug, postType = "rsnd") {
  const posts = await getPostBySlug(slug, postType);
  const post = posts.length > 0 ? posts[0] : null;
  return post;
}

export async function getSlugs(type) {
  let elements = await getPosts(type);

  const elementsIds = elements.map((element) => ({
    params: {
      slug: element.slug,
    },
  }));
  return elementsIds;
}
