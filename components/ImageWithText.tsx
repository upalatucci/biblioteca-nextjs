import Image from "next/image";
import Link from "next/link";

type BookType = {
  title: string;
  description?: string;
  image: StaticImageData;
  textOverlayHeight?: number;
  width: number;
  height: number;
  path?: string;
  overlay?: boolean;
};

const ImageWithText: React.FC<BookType> = ({
  title,
  description,
  image,
  width,
  height,
  path
}) => (
  <div className="flex flex-1 justify-center mx-4 relative">
    <Link href={path}>
      <a>
        <div className="image w-60 md:w-44 lg:w-60 xl:w-96 mx-auto z-10">
          <Image
            src={image}
            alt={title}
            layout="responsive"
            width={width}
            height={height}
            objectFit="cover"
            className="pointer-events-none rounded-xl"
          />
        </div>
        <div
          className={
            "font-sans flex flex-col items-center justify-start m-6 md:px-4 md:py-8 text-center"
          }
        >
          <h3 className="lg:text-lg font-bold mb-2">{title}</h3>
          {description && (
            <span className="bg-defaultBg px-6 py-2 rounded-full">
              {description}
            </span>
          )}
        </div>
      </a>
    </Link>
  </div>
);
export default ImageWithText;
