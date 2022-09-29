
export type ChapterWithParagraphs = {
  title: string;
  paragraphs: string[];
};

export type IndexType = Array<string | ChapterWithParagraphs>;

type BookDescriptionProps = {
  index: IndexType;
};

const BookDescription: React.FC<BookDescriptionProps> = ({
  index,
}) => (
  <div className="book-description">
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
