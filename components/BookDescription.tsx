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

const BookDescription = ({ image, imageAlt, index }) => (
  <div className="book-description">
    <Image src={image} alt={imageAlt} width={475} height={600} />
    <div className="index">
      <h3>Indice</h3>
      <ul>
        {index.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default BookDescription;
