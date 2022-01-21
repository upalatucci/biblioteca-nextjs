import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import PostResults from '../components/PostResults';
import Search from '../components/Search';
import { getPosts } from '../lib/wordpress';
import { mapElasticResultToPost } from '../utils/elasticSearchUtils';

export default function Home({ posts }) {
  const [searchedPosts, setSearchedPosts] = useState();

  const jsxPosts = posts.map((post) => {
    return <PostResults post={post} key={post.id} />;
  });

  const onSearchPost = async (searchText) => {
    const response = await fetch(`/api/search?q=${searchText}`);

    const jsonResponse = await response.json();

    setSearchedPosts(
      mapElasticResultToPost(jsonResponse)?.map((post) => (
        <PostResults post={post} key={post.id} />
      ))
    );
  };

  return (
    <>
      <Head>
        <title>Nichiren Library</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <meta
          name="description"
          content="Keep up to date with the latest trends in tech"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* You can add more metadata here, like open graph tags for social media, etc */}
      </Head>

      <div className="container pt-5">
        <h1 className="text-center pb-5">Nichiren Library</h1>
        <div className="row">
          <div className="col-lg-8">
            <h2 className="pb-3">Our blog posts</h2>
            <Search onSearch={onSearchPost} />
            {searchedPosts ? searchedPosts : jsxPosts}
          </div>
        </div>
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
