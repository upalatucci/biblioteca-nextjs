import Image from "next/image";
import classnames from "classnames";

type BookType = {
  title: string;
  description: string;
  image: StaticImageData;
  textOverlayHeight?: number;
  width: number;
  height: number;
  className?: string;
};

const ImageWithTextOverlay: React.FC<BookType> = ({
  title,
  description,
  image,
  textOverlayHeight = 1,
  width,
  height,
  className,
}) => (
  <div className={classnames("image-with-text-overlay", className)}>
    <div className="image">
      <Image
        src={image}
        alt={title}
        layout="responsive"
        width={width}
        height={height}
        objectFit="cover"
      />
    </div>
    <div className={`text text-overlay-height-${textOverlayHeight}`}>
      <h3 className="title">{title}</h3>
      <span>{description}</span>
    </div>
  </div>
);

export default ImageWithTextOverlay;
