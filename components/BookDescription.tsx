import Image from "next/image";

export type ChapterWithParagraphs = {
  title: string;
  paragraphs: string[];
};

export type IndexType = Array<string | ChapterWithParagraphs>;

type BookDescriptionProps = {
  image: StaticImageData;
  imageAlt: string;
  index: IndexType;
};

const BookDescription: React.FC<BookDescriptionProps> = ({
  image,
  imageAlt,
  index,
}) => (
  <div className="book-description">
    <div className="book-image">
      <Image
        src={image}
        alt={imageAlt}
        width={475}
        height={600}
        objectFit="fill"
      />
    </div>
    <div className="index">
      <h3>Indice</h3>
      <ul>
        {index.map((item) => {
          if (typeof item === "string") return <li key={item}>{item}</li>;
          else {
            if (item.title) {
              return (
                <li key={item.title}>
                  {item.title}
                  <ul>
                    {item.paragraphs.map((paragraph) => (
                      <li key={paragraph}>{paragraph}</li>
                    ))}
                  </ul>
                </li>
              );
            }
          }
        })}
      </ul>
    </div>
  </div>
);

export default BookDescription;
