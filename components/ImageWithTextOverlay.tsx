import Image from "next/image";
import classnames from "classnames";
import Link from "next/link";

type BookType = {
  title: string;
  description: string;
  image: StaticImageData;
  textOverlayHeight?: number;
  width: number;
  height: number;
  className?: string;
  path?: string;
};

const ImageWithTextOverlay: React.FC<BookType> = ({
  title,
  description,
  image,
  width,
  height,
  className,
  path,
}) => (
  <div className={classnames("flex-initial w-86 md:w-96 mx-4", className)}>
    {path ? (
      <Link href={path}>
        <a className="pointer-events-none">
          <div className="image">
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
          <div className='relative bg-white rounded-xl shadow-md flex flex-col justify-evenly bottom-32 h-44 m-6 px-4 py-8 text-center'>
            <h3 className="lg:text-lg font-bold">{title}</h3>
            <span>{description}</span>
          </div>
        </a>
      </Link>
    ) : (
      <>
        <div className="image">
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
        <div className='relative bg-white rounded-xl shadow-md flex flex-col justify-evenly bottom-32 h-44 m-6 px-4 text-center'>
          <h3 className="lg:text-lg font-bold">{title}</h3>
          <span>{description}</span>
        </div>
      </>
    )}
  </div>
);

export default ImageWithTextOverlay;
