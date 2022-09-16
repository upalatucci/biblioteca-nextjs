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
    <Link href={`/posts/${post.slug}`} passHref>
      <div className="post-result card mb-3">
        <div className="card-body">
          <h5
            className="card-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: `${post.content.rendered.substring(0, 600)}...`
            }}
          ></div>
          <p className="card-text">
            {post.highlight_fields
              .filter((field) => field !== "post_title")
              .map((highlightField) => (
                <Link
                  key={highlightField}
                  href={`/posts/${post.slug}#${linkField[highlightField]}`}
                  passHref
                >
                  <span className="badge">
                    {humanizedField[highlightField]}
                  </span>
                </Link>
              ))}

            <small className="text-muted">On {getDate(post.modified)}</small>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
