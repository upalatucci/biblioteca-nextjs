import Link from "next/link";
import { FC } from "react";
import {
  CategoryType,
  PostResultType,
  PostType,
} from "@utils/elasticSearchUtils";

type PostProps = {
  post: PostResultType;
};

const humanizedField = {
  post_content: "CONTENUTO",
  "meta.acf_cenni_storici.value": "CENNI STORICI",
  "meta.acf_note.value": "NOTE",
};

const humanizeTypeCategory = (type: PostType, categories: string[]) => {
  if (type === "glossario") return "Glossario";

  if (type === "rsnd") {
    if (categories.length > 1)
      return `Raccolta degli scritti di Nichiren Daishonin Volume I/II`;
    return `Raccolta degli scritti di Nichiren Daishonin ${categories?.[0]}`;
  }

  return categories?.[0];
};

const linkField = {
  post_content: "contenuto",
  "meta.acf_cenni_storici.value": "cenni_storici",
  "meta.acf_note.value": "note",
};

const GlossarioResult: FC<PostProps> = ({ post }) => (
  <li className="py-6">
    <div className="font-sans">
      <h5
        className="font-bold pb-4 text-lg text-primary"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className="lg:mr-20"
        dangerouslySetInnerHTML={{
          __html: `${post.content.rendered.substring(0, 400)}...`,
        }}
      ></div>
      <p className="flex items-center mt-4">
        {post.highlight_fields
          .filter((field) => field !== "post_title")
          .map((highlightField) => (
            <span
              className="border border-primary rounded-xl px-4 mr-2 text-md"
              key={highlightField}
            >
              {humanizedField[highlightField]}
            </span>
          ))}

        <span className="font-semibold">
          {humanizeTypeCategory(post.type, post.categories)}
        </span>
      </p>
    </div>
  </li>
);

const PostResultContent: FC<PostProps> = ({ post }) => (
  <li className="py-6">
    <div className="font-sans">
      <Link href={`/${post.baseURL}/${post.slug}`} passHref>
        <a>
          <h5
            className="font-bold pb-4 text-lg text-primary"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="lg:mr-20"
            dangerouslySetInnerHTML={{
              __html: `${post.content.rendered.substring(0, 400)}...`,
            }}
          ></div>
        </a>
      </Link>
      <p className="flex items-center mt-4">
        {post.highlight_fields
          .filter((field) => field !== "post_title")
          .map((highlightField) => (
            <Link
              key={highlightField}
              href={`/${post.baseURL}/${post.slug}#${linkField[highlightField]}`}
              passHref
            >
              <a>
                <span className="border border-primary rounded-xl px-4 mr-2 text-md">
                  {humanizedField[highlightField]}
                </span>
              </a>
            </Link>
          ))}

        <span className="font-semibold">
          {humanizeTypeCategory(post.type, post.categories)}
        </span>
      </p>
    </div>
  </li>
);

const Post: FC<PostProps> = ({ post }) => {
  if (post?.type === "glossario") {
    return <GlossarioResult post={post} />;
  }

  return <PostResultContent post={post} />;
};

export default Post;
