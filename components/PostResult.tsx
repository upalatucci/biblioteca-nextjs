import Link from "next/link";
import { FC } from "react";
import { PostResultType } from "../utils/elasticSearchUtils";

type PostProps = {
  post: PostResultType;
};

const humanizedField = {
  post_content: "CONTENUTO",
  "meta.acf_cenni_storici.value": "CENNI STORICI",
  "meta.acf_note.value": "NOTE"
};

const humanizeCategory = (categories) => {
  if (categories.find((category) => category.slug === "vol1"))
    return "Raccolta degli scritti di Nichiren Daishonin I";
  if (categories.find((category) => category.slug === "vol2"))
    return "Raccolta degli scritti di Nichiren Daishonin II";
};

const linkField = {
  post_content: "contenuto",
  "meta.acf_cenni_storici.value": "cenni_storici",
  "meta.acf_note.value": "note"
};

const PostResultContent: FC<PostProps> = ({ post }) => (
  <div className="font-sans">
    <h5
      className="font-bold pb-4 text-lg text-primary"
      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
    />
    <div
      className="lg:mr-20"
      dangerouslySetInnerHTML={{
        __html: `${post.content.rendered.substring(0, 400)}...`
      }}
    ></div>
    <p className="flex items-center mt-4">
      {post.highlight_fields
        .filter((field) => field !== "post_title")
        .map((highlightField) => (
          <Link
            key={highlightField}
            href={`/posts/${post.slug}#${linkField[highlightField]}`}
            passHref
          >
            <span className="border border-primary rounded-xl px-4 mr-2 text-md">
              {humanizedField[highlightField]}
            </span>
          </Link>
        ))}

      <span className="font-semibold">
        {post?.type === "glossario"
          ? "Glossario"
          : humanizeCategory(post.categories)}
      </span>
    </p>
  </div>
);

const Post: FC<PostProps> = ({ post }) => {
  if (post?.type === "glossario") {
    return (
      <li className="py-6">
        <PostResultContent post={post} />
      </li>
    );
  }

  return (
    <li className="py-6">
      <Link href={`/posts/${post.slug}`} passHref>
        <a>
          <PostResultContent post={post} />
        </a>
      </Link>
    </li>
  );
};

export default Post;
