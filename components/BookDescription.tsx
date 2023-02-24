import classNames from "classnames";
import Link from "next/link";

export type ChapterWithParagraphs = {
  title: string;
  slug?: string;
  disabled?: boolean;
  number?: number;
};

type BookDescriptionProps = {
  index: ChapterWithParagraphs[];
  notes?: ChapterWithParagraphs[];
  chapters?: ChapterWithParagraphs[];
  title: string;
  subtitle?: string;
  baseSlug?: string;
};

const BookDescription: React.FC<BookDescriptionProps> = ({
  index,
  notes,
  chapters,
  title,
  subtitle,
  baseSlug = "rsnd"
}) => (
  <section className="w-full bg-white rounded-xl shadow-md p-10 md:p-20 mb-20">
    <div className="mx-auto max-w-6xl pb-10">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-400">{subtitle}</p>
    </div>
    <div className="mx-auto max-w-6xl bg-defaultBg rounded-xl shadow-md flex flex-col md:flex-row gap-4 p-10 mb-10">
      <div className="index flex-1">
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
                    <Link href={`/${baseSlug}/${item.slug}`}>
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
      {notes && (
        <div className="notes flex-1">
          <h3 className="text-2xl font-bold mb-4 text-primary">Appendici</h3>
          <ul className="">
            {notes
              .sort((a, b) => (a.number > b.number ? 1 : -1))
              .map((note) => (
                <li className="py-1" key={note.slug}>
                  <Link href={`/${baseSlug}/${note.slug}`}>
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
      )}
      {chapters && (
        <div className="chapters pt-10 flex-1">
          <ul className="divide-y-2 divide-gray-200 divide-dashed">
            {chapters
              .sort((a, b) => (a.number > b.number ? 1 : -1))
              .map((chapter) => (
                <li className="py-1" key={chapter.slug ?? chapter.title}>
                  <Link
                    href={chapter.slug ? `/${baseSlug}/${chapter.slug}` : ""}
                  >
                    <a
                      className={classNames({
                        "text-gray-400": chapter.disabled,
                        "pointer-events-none": !chapter.slug
                      })}
                    >
                      <span className="font-semibold text-sm">
                        {chapter.title.replace("Appendice", "")}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  </section>
);

export default BookDescription;
