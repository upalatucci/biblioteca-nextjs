import Link from "next/link";
import classNames from "classnames";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GoshoType } from "./GoshoList";

const nLi = new Array(10).fill(0).map((_, index) => index);

const Skeleton = React.memo(() => (
  <>
    {nLi.map((i) => (
      <li className="py-2 animate-pulse" key={i}>
        <div className="flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 max-w-sm bg-slate-200 rounded"></div>
          </div>
        </div>
      </li>
    ))}
  </>
));
Skeleton.displayName = "Skeleton";

type PostMenuProps = {
  currentPostTitle?: string;
  withBackgrounds?: boolean;
  withNotes?: boolean;
  jsonData: GoshoType[];
};

const PostMenu: React.FC<PostMenuProps> = ({
  jsonData,
  currentPostTitle,
  withNotes = false,
  withBackgrounds = false,
}) => {
  const activeLiRef = useRef<HTMLLIElement>();

  useLayoutEffect(() => {
    if (activeLiRef.current) {
      activeLiRef.current.parentElement.scrollTop =
        activeLiRef.current.offsetTop -
        activeLiRef.current.parentElement.offsetTop -
        80;
    }
  });

  return (
    <div className="post-menu w-full lg:w-[300px] lg:min-w-[300px] xl:w-[400px] xl:min-w-[400px] print:hidden">
      <div className="px-6 py-4 w-full text-md mb-4 rounded-2xl shadow-md bg-defaultBg">
        <ul className="flex items-center justify-evenly flex-wrap lg:block lg:divide-y-2 divide-dashed divide-gray-300">
          <li className="mx-2 lg:mx-0 py-2 hover:text-primary">
            <button>Condividi</button>
          </li>
          <li className="mx-2 lg:mx-0 py-2 hover:text-primary">
            <button>Sava in pdf</button>
          </li>
          <li className="mx-2 lg:mx-0 py-2 hover:text-primary">
            <button onClick={() => print()}>Stampa</button>
          </li>
          {/* <li className="mx-2 lg:mx-0 py-1">Ascolta l&apos;audio</li> */}
          <li className="mx-2 lg:mx-0 py-2 hover:text-primary">
            <button>Dimensione del testo</button>
          </li>
        </ul>
      </div>
      {withBackgrounds ||
        (withNotes && (
          <div className="px-6 py-4 hidden lg:block w-full text-md mb-4 rounded-2xl shadow-md bg-secondary text-white">
            <ul className="divide-y-2 divide-dashed divide-white">
              {withBackgrounds && (
                <li className="py-1">
                  <a href="#cenni_storici">Vai ai cenni storici</a>
                </li>
              )}
              {withNotes && (
                <li className="py-1">
                  <a href="#note">Vai alle note</a>
                </li>
              )}
            </ul>
          </div>
        ))}

      <div className="px-6 py-4 hidden lg:block w-full text-md mb-4 rounded-2xl shadow-md  bg-defaultBg">
        <Link href="/glossario">
          <a className="hover:text-primary">
            <h3 className="text-3xl">Glossario</h3>
          </a>
        </Link>
      </div>

      <div className="px-6 py-4 hidden lg:flex flex-col w-full text-md mb-4 rounded-2xl shadow-md bg-defaultBg min-h-[500px] h-screen max-h-max">
        <h3 className="text-3xl border-b-2 border-secondary pb-4">Scritti</h3>
        <ul className="divide-y-2 divide-dashed divide-gray-300 overflow-y-scroll">
          {jsonData?.length === 0 && <Skeleton />}

          {jsonData
            .sort((a, b) => (a.number > b.number ? 1 : -1))
            .map((post, index) => (
              <li
                key={post.slug}
                className={classNames("font-semibold py-2", {
                  "text-primary": post.title === currentPostTitle,
                })}
                ref={post.title === currentPostTitle ? activeLiRef : null}
              >
                <Link href={`/rsnd/${post.slug}`}>
                  <a
                    dangerouslySetInnerHTML={{
                      __html: `${post?.number || index + 1}. ${post.title}`,
                    }}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostMenu;
