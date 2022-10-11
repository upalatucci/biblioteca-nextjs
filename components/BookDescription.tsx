
export type ChapterWithParagraphs = {
  title: string;
  paragraphs: string[];
};

export type IndexType = Array<string | ChapterWithParagraphs>;

type BookDescriptionProps = {
  index: IndexType;
  notes: ChapterWithParagraphs;
};

const BookDescription: React.FC<BookDescriptionProps> = ({
  index,
  notes,
}) => (
  <section className="w-full">
    <div className="mx-auto max-w-5xl bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-4 justify-between p-10 mb-10">
      <div className="index">
        <h3 className="text-4xl font-bold mb-4">Indice</h3>
        <ul className="divide-y-2 divide-gray-200 divide-dashed">
          {index.map((item) => {
            if (typeof item === "string") return <li className="font-bold py-2" key={item}>{item}</li>;
            else {
              if (item.title) {
                return (
                  <li key={item.title}>
                    <span className="font-bold">{item.title}</span>
                    <ul className="ml-4">
                      {item.paragraphs.map((paragraph) => (
                        <li className="py-1" key={paragraph}>{paragraph}</li>
                      ))}
                    </ul>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
      <div className="notes">
        <h3 className="text-4xl font-bold mb-4">{notes.title}</h3>
        <ul className="divide-y-2 divide-gray-200 divide-dashed">
            {notes.paragraphs.map((paragraph) => (
              <li className="py-1" key={paragraph}>{paragraph}</li>
            ))}
        </ul>
      </div>
    </div>
  </section>
);

export default BookDescription;
