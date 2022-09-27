export async function getPosts(postType = "posts") {
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
    console.log("Total posts fetched", totalPosts.length);
  }
}

export async function getPostBySlug(slug, postType = "posts") {
  const postsRes = await fetch(
    `${process.env.WORDPRESS_API_ENDPOINT}/${postType}?slug=${slug}`
  );
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug, postType = "posts") {
  const posts = await getPostBySlug(slug, postType);
  const post = posts.length > 0 ? posts[0] : null;
  return post;
}
export async function getEvents() {
  const eventsRes = await fetch(`${process.env.WORDPRESS_API_ENDPOINT}/events`);
  const events = await eventsRes.json();
  return events;
}

export async function getEvent(slug) {
  const events = await getEvents();
  const eventArray = events.filter((event) => event.slug === slug);
  const event = eventArray.length > 0 ? eventArray[0] : null;
  return event;
}

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case "posts":
      elements = await getPosts();
      break;
    case "events":
      elements = await getEvents();
      break;
    case "glossario":
      elements = await getPosts("glossario");
    default:
      break;
  }
  const elementsIds = elements.map((element) => ({
    params: {
      slug: element.slug
    }
  }));
  return elementsIds;
}
