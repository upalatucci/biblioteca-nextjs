import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { PostResultType } from "../utils/elasticSearchUtils";

//to use Image with an external url, add some config on next.config.js
//for more info, check out these docs https://nextjs.org/docs/basic-features/image-optimization
import { getDate } from "../utils/utils";

interface PostProps {
  post: PostResultType;
}

const Post: FC<PostProps> = ({ post }) => {
  const image = post.featured_media ? post.featured_media[0] : null;

  return (
    <div className="card mb-3">
      <div className="row">
        {image && (
          <div className="col-md-4">
            <Link href={`/posts/${post.slug}`}>
              <a>
                <Image
                  src={image["media_details"].sizes.medium["source_url"]}
                  width={180}
                  height={120}
                  alt={image["alt_text"]}
                />
              </a>
            </Link>
          </div>
        )}
        <div className="col">
          <div className="card-body">
            <h5
              className="card-title"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: `${post.content.rendered.substring(0, 600)}...`,
              }}
            ></div>
            <p className="card-text">
              <small className="text-muted">On {getDate(post.modified)}</small>
            </p>
            <Link href={`/posts/${post.slug}`}>
              <a className="btn btn-primary">See more</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
