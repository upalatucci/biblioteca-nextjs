import React, { useCallback, useContext, useState } from "react";
import ShareModal from "./ShareModal";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import textSizeIcon from "@public/icons/ico-text-size.svg";
import shareIcon from "@public/icons/ico-share.svg";
import printIcon from "@public/icons/ico-print.svg";
import notesIcon from "@public/icons/ico-notes.svg";
import backgroundIcon from "@public/icons/ico-background.svg";
import {
  FontSizeContext,
  FontSizeType,
  fontSizes,
} from "contexts/FontSizeContext";

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
  image?: ImageProps["src"];
  imageLink?: string;
};

const PostMenu: React.FC<PostMenuProps> = ({
  currentPostTitle,
  withNotes = false,
  withBackgrounds = false,
  image,
  imageLink,
}) => {
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const [openShareModal, setOpenShareModal] = useState(false);

  const share = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: currentPostTitle,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      setOpenShareModal(true);
    }
  }, [currentPostTitle]);

  const rotateFontSizes = useCallback(() => {
    const currentFontIndex = fontSizes.findIndex((sizes) => sizes === fontSize);

    const nextIndex = (currentFontIndex + 1) % fontSizes.length;

    setFontSize(fontSizes[nextIndex] as FontSizeType);
  }, [fontSize]);

  return (
    <div className="post-menu w-full print:hidden">
      {openShareModal && (
        <ShareModal
          title={currentPostTitle}
          onClose={() => setOpenShareModal(false)}
        />
      )}
      <div className="post-menu gap-10 p-8 md:p-10 w-full text-md rounded-3xl shadow-md bg-defaultBg flex sm:flex-row items-center justify-start">
        {image && (
          <Link href={imageLink ?? "#"}>
            <div className="image-post-menu">
              <Image src={image} alt="image" width={100} height={140} />
            </div>
          </Link>
        )}
        <ul className="post-menu-list flex sm:flex-row items-start sm:items-center sm:justify-start gap-x-4 gap-y-0 lg:gap-10 flex-wrap w-full">
          <li className="lg:mx-0 py-2 hover:text-primary">
            <button
              onClick={share}
              className="flex items-center gap-2 font-sans text-md lg:text-lg"
            >
              <Image src={shareIcon} alt="Condividi" width={15} height={15} />{" "}
              <span className="post-menu-item-label">Condividi</span>
            </button>
          </li>
          <li className="lg:mx-0 py-2 hover:text-primary">
            <button
              onClick={() => print()}
              className="flex items-center gap-2 font-sans text-md lg:text-lg"
            >
              <Image src={printIcon} alt="Stampa" width={15} height={15} />{" "}
              <span className="post-menu-item-label">Stampa</span>
            </button>
          </li>
          {/* <li className="lg:mx-0 py-1">Ascolta l&apos;audio</li> */}
          <li className="lg:mx-0 py-2 hover:text-primary font-sans text-md lg:text-lg">
            <button
              className="flex items-center gap-2 font-sans text-md lg:text-lg"
              onClick={rotateFontSizes}
            >
              <Image
                src={textSizeIcon}
                alt="Ridimensiona il testo"
                width={21}
                height={21}
              />{" "}
              <span className="post-menu-item-label">Dimensione del testo</span>
            </button>
          </li>

          {(withBackgrounds || withNotes) && (
            <span className="block invisible !w-full md:!w-auto md:visible md:inline border-l-2 border-gray-300 h-4 w-2"></span>
          )}

          {withBackgrounds && (
            <li className="py-2 hover:text-primary">
              <a
                href="#cenni_storici"
                className="flex items-center gap-3 font-sans text-md lg:text-lg"
              >
                <Image
                  src={backgroundIcon}
                  alt="Leggi i cenni storici"
                  width={17}
                  height={17}
                />{" "}
                <span className="post-menu-item-label">
                  Vai ai cenni storici
                </span>
              </a>
            </li>
          )}
          {withNotes && (
            <li className="py-2 hover:text-primary">
              <a
                href="#note"
                className="flex items-center gap-3 font-sans text-md lg:text-lg"
              >
                <Image
                  src={notesIcon}
                  alt="Leggi le note"
                  width={15}
                  height={15}
                />{" "}
                <span className="post-menu-item-label">Vai alle note</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PostMenu;
