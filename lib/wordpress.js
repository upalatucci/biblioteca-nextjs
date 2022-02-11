export async function getPosts() {
  let page = 1;
  let totalPosts = [];

  while (true) {
    const postsResponse = await fetch(
      process.env.WORDPRESS_API_ENDPOINT + `/posts?per_page=100&page=${page}`
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

export async function getPostBySlug(slug) {
  const postsRes = await fetch(
    process.env.WORDPRESS_API_ENDPOINT + `/posts?slug=${slug}`
  );
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug) {
  const posts = await getPostBySlug(slug);
  const post = posts.length > 0 ? posts[0] : null;
  return post;
}
export async function getEvents() {
  const eventsRes = await fetch(process.env.WORDPRESS_API_ENDPOINT + "/events");
  const events = await eventsRes.json();
  return events;
}

export async function getEvent(slug) {
  const events = await getEvents();
  const eventArray = events.filter((event) => event.slug == slug);
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
  }
  const elementsIds = elements.map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
}
