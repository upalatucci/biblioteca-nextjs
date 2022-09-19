import Link from "next/link";
import { FC } from "react";
import { PostResultType } from "../utils/elasticSearchUtils";

//to use Image with an external url, add some config on next.config.js
//for more info, check out these docs https://nextjs.org/docs/basic-features/image-optimization
import { getDate } from "../utils/utils";

type PostProps = {
  post: PostResultType;
};

const humanizedField = {
  post_content: "CONTENUTO",
  "meta.acf_cenni_storici.value": "CENNI STORICI",
  "meta.acf_note.value": "NOTE"
};

const linkField = {
  post_content: "contenuto",
  "meta.acf_cenni_storici.value": "cenni_storici",
  "meta.acf_note.value": "note"
};

const Post: FC<PostProps> = ({ post }) => {
  return (
    <div className="py-6">
      <Link href={`/posts/${post.slug}`} passHref>
        <a>
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

            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Post;
