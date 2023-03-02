import Link from "next/link";
import { FC, useCallback, useRef, useState } from "react";
import { PostResultType, PostType } from "@utils/elasticSearchUtils";
import { useRouter } from "next/router";
import { FIELDS } from "@utils/constants";
import { getQueryParamAsArray } from "@utils/utils";

type PostProps = {
  post: PostResultType;
};

const humanizedField = {
  post_content_filtered: "CONTENUTO",
  "post_content_filtered.exact": "CONTENUTO",
  "meta.acf_cenni_storici.value": "CENNI STORICI",
  "meta.acf_cenni_storici.value.exact": "CENNI STORICI",
  "meta.acf_note.value": "NOTE",
  "meta.acf_note.value.exact": "NOTE",
};

const humanizeTypeCategory = (type: PostType, categories: string[]) => {
  if (type === "glossary") return "Glossario";

  if (type === "rsnd") {
    if (categories.length > 1)
      return `Raccolta degli scritti di Nichiren Daishonin Volume I/II`;
    return `Raccolta degli scritti di Nichiren Daishonin ${categories?.[0]}`;
  }

  return categories?.[0];
};

const linkField = {
  post_content_filtered: "contenuto",
  "post_content_filtered.exact": "contenuto",
  "meta.acf_cenni_storici.value": "cenni_storici",
  "meta.acf_cenni_storici.value.exact": "cenni_storici",
  "meta.acf_note.value": "note",
  "meta.acf_note.value.exact": "note",
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
        <div className="font-sans">
          <h5
            className="font-bold pb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            ref={contentRef}
            className="lg:mr-20"
            dangerouslySetInnerHTML={{
              __html: isOpen ? contentOpen : contentClose,
            }}
          ></div>

          <p className="flex items-center mt-4 flex-wrap">
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

            <span className="text-primary">
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
  const fields = getQueryParamAsArray<FIELDS>(
    router.query.fields || Object.values(FIELDS)
  );
  const textSearch = router.query.q;

  let postQueryParams = `?q=${textSearch}${fields
    ?.map((field) => `&fields=${field}`)
    .join("")}`;

  if (router.query.searchType) {
    postQueryParams += `&searchType=${router.query.searchType}`;
  }

  return (
    <li className="py-6">
      <div className="font-sans">
        <Link href={`/${post.baseURL}/${post.slug}${postQueryParams}`} passHref>
          <a>
            <h5
              className="font-bold pb-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="lg:mr-20"
              dangerouslySetInnerHTML={{
                __html: `${(post?.highlight || post.content.rendered).substring(
                  0,
                  400
                )}...`,
              }}
            ></div>
          </a>
        </Link>
        <p className="flex items-center mt-4  flex-wrap gap-2">
          {post.highlight_fields
            .filter(
              (field) => !["post_title", "post_title.exact"].includes(field)
            )
            .map((highlightField) => (
              <Link
                key={highlightField}
                href={`/${post.baseURL}/${post.slug}${postQueryParams}#${linkField[highlightField]}`}
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
