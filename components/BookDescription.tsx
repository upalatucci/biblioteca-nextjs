import Link from "next/link";

export type ChapterWithParagraphs = {
  title: string;
  slug?: string;
};

export type IndexType = Array<string | ChapterWithParagraphs>;

type BookDescriptionProps = {
  index: IndexType;
  notes: ChapterWithParagraphs[];
  title: string;
  subtitle?: string;
};

const BookDescription: React.FC<BookDescriptionProps> = ({
  index,
  notes,
  title,
  subtitle
}) => (
  <section className="w-full font-serif bg-white rounded-xl shadow-md p-20 mb-20">
    <div className="mx-auto max-w-5xl pb-10">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-400">{subtitle}</p>
    </div>
    <div className="mx-auto max-w-5xl bg-defaultBg rounded-xl shadow-md flex flex-col md:flex-row gap-4 justify-between p-10 mb-10">
      <div className="index">
        <h3 className="text-2xl font-bold mb-4 text-primary">
          Materiale introduttivo
        </h3>
        <ul className="divide-y-2 divide-gray-200 divide-dashed">
          {index.map((item) => {
            if (typeof item === "string")
              return (
                <li className="font-bold py-2" key={item}>
                  {item}
                </li>
              );
            else {
              if (item.title) {
                return (
                  <li key={item.title}>
                    <Link href={`/rsnd/${item.slug}`}>
                      <a>
                        <span className="font-semibold text-sm">
                          {item.title}
                        </span>
                      </a>
                    </Link>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
      <div className="notes">
        <h3 className="text-2xl font-bold mb-4 text-primary">Appendici</h3>
        <ul className="">
          {notes
            .sort((a, b) => (a.title > b.title ? 1 : -1))
            .map((note) => (
              <li className="py-1" key={note.slug}>
                <Link href={`/rsnd/${note.slug}`}>
                  <a>
                    <span className="font-semibold text-sm">
                      {note.title.replace("Appendice", "")}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  </section>
);

export default BookDescription;
