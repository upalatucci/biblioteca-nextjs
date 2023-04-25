import Link from "next/link";
import { FC, useCallback, useRef, useState } from "react";
import { ElasticSearchPost, buildHighlight } from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import {
  getFullGlossaryContentHighlighted,
  getPostResultLink,
  humanizeTypeCategory,
  humanizedField,
} from "./utils";
import { SDL_CAT_ID } from "@utils/constants";

type PostProps = {
  post: ElasticSearchPost;
  highlights?: Record<string, string[]>;
};

const GlossarioResult: FC<PostProps> = ({ post, highlights }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>();

  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const contentOpen = getFullGlossaryContentHighlighted(
    post.post_content,
    highlights?.["post_content.exact"] || highlights?.["post_content"]
  );

  const highlightedContent = buildHighlight(highlights);

  const contentClose = `${(highlightedContent || post.post_content).substring(
    0,
    400
  )}...`;

  const title =
    highlights?.post_title?.[0] ||
    highlights?.["post_title.exact"]?.[0] ||
    post.post_title;

  return (
    <li className="py-6">
      <button className="text-left" onClick={toggleOpen}>
        <div className="text-md md:text-lg">
          <h5
            className="font-bold pb-4 text-lg md:text-xl"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            ref={contentRef}
            className="result lg:mr-20 font-medium text-md md:text-lg"
            dangerouslySetInnerHTML={{
              __html: isOpen ? contentOpen : contentClose,
            }}
          ></div>

          <p className="font-sans flex items-center mt-4 flex-wrap gap-2 uppercase">
            {Object.keys(highlights)
              ?.filter(
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
              {humanizeTypeCategory(post.post_type, post.term_suggest)}
            </span>
          </p>
        </div>
      </button>
    </li>
  );
};

const PostResultContent: FC<PostProps> = ({ post, highlights }) => {
  const router = useRouter();

  let title =
    highlights?.post_title?.[0] ||
    highlights?.["post_title.exact"]?.[0] ||
    post.post_title;

  const highlightedContent = buildHighlight(highlights);

  if (post?.terms?.cat_sdlpe?.find((cat) => cat.term_id === SDL_CAT_ID)) {
    title = `${post?.meta?.acf_numero?.[0]?.value}. ${title}`;
  }

  return (
    <li className="py-6">
      <div className="">
        <Link
          href={getPostResultLink(post, router.query)}
          passHref
          scroll={false}
        >
          <h5
            className="font-bold pb-4 text-lg md:text-xl"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            className="result lg:mr-20 font-medium text-md md:text-lg"
            dangerouslySetInnerHTML={{
              __html: `${(highlightedContent || post.post_content).substring(
                0,
                400
              )}...`,
            }}
          ></div>
        </Link>
        <p className="font-sans flex items-center mt-4 flex-wrap gap-2 uppercase">
          {Object.keys(highlights)
            ?.filter(
              (field) => !["post_title", "post_title.exact"].includes(field)
            )
            .map((highlightField) => (
              <Link
                key={highlightField}
                href={getPostResultLink(post, router.query, highlightField)}
                passHref
              >
                <span className="border border-gray-400 rounded-xl px-4 py-1 text-sm bg-gray-50 text-gray-500 break-keep">
                  {humanizedField[highlightField]}
                </span>
              </Link>
            ))}

          <span className="text-primary">
            {humanizeTypeCategory(post.post_type, post.term_suggest)}
          </span>
        </p>
      </div>
    </li>
  );
};

const Post: FC<PostProps> = ({ post, highlights }) => {
  if (post?.post_type === "glossary") {
    return <GlossarioResult post={post} highlights={highlights} />;
  }

  return <PostResultContent post={post} highlights={highlights} />;
};

export default Post;
