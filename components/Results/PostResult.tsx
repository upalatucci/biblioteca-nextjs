import Link from "next/link";
import { FC, useCallback, useRef, useState } from "react";
import { PostResultType } from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import {
  getPostResultLink,
  humanizeTypeCategory,
  humanizedField,
} from "./utils";

type PostProps = {
  post: PostResultType;
};

const GlossarioResult: FC<PostProps> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>();

  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const contentOpen = post.content.rendered;

  const contentClose = `${(post?.highlight || post.content.rendered).substring(
    0,
    400
  )}...`;

  return (
    <li className="py-6">
      <button className="text-left" onClick={toggleOpen}>
        <div className="text-md md:text-lg">
          <h5
            className="font-bold pb-4 text-lg md:text-xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            ref={contentRef}
            className="result lg:mr-20 font-medium text-md md:text-lg"
            dangerouslySetInnerHTML={{
              __html: isOpen ? contentOpen : contentClose,
            }}
          ></div>

          <p className="font-sans flex items-center mt-4 flex-wrap gap-2 uppercase">
            {post.highlight_fields
              .filter(
                (field) => !["post_title", "post_title.exact"].includes(field)
              )
              .map((highlightField) => (
                <span
                  className="border border-gray-400 rounded-xl px-4 py-1 mr-2 text-sm bg-gray-50 text-gray-500 break-keep"
                  key={highlightField}
                >
                  {humanizedField[highlightField]}
                </span>
              ))}

            <span className="text-md md:text-lg text-primary">
              {humanizeTypeCategory(post.type, post.categories)}
            </span>
          </p>
        </div>
      </button>
    </li>
  );
};

const PostResultContent: FC<PostProps> = ({ post }) => {
  const router = useRouter();

  return (
    <li className="py-6">
      <div className="">
        <Link href={getPostResultLink(post, router.query)} passHref>
          <a>
            <h5
              className="font-bold pb-4 text-lg md:text-xl"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="result lg:mr-20 font-medium text-md md:text-lg"
              dangerouslySetInnerHTML={{
                __html: `${(post?.highlight || post.content.rendered).substring(
                  0,
                  400
                )}...`,
              }}
            ></div>
          </a>
        </Link>
        <p className="font-sans flex items-center mt-4 flex-wrap gap-2 uppercase">
          {post.highlight_fields
            .filter(
              (field) => !["post_title", "post_title.exact"].includes(field)
            )
            .map((highlightField) => (
              <Link
                key={highlightField}
                href={getPostResultLink(post, router.query, highlightField)}
                passHref
              >
                <a>
                  <span className="border border-gray-400 rounded-xl px-4 py-1 text-sm bg-gray-50 text-gray-500 break-keep">
                    {humanizedField[highlightField]}
                  </span>
                </a>
              </Link>
            ))}

          <span className="text-primary">
            {humanizeTypeCategory(post.type, post.categories)}
          </span>
        </p>
      </div>
    </li>
  );
};

const Post: FC<PostProps> = ({ post }) => {
  if (post?.type === "glossary") {
    return <GlossarioResult post={post} />;
  }

  return <PostResultContent post={post} />;
};

export default Post;
