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
  <section className="w-full bg-white rounded-3xl shadow-md py-14 lg:py-32 px-8">
    <div className="mx-auto max-w-[1400px] pb-10">
      <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
      <p className="font-sans font-medium text-md md:text-xl text-gray-500">{subtitle}</p>
    </div>
    <div className="mx-auto max-w-[1400px] bg-defaultBg rounded-3xl shadow-md flex flex-col md:flex-row md:gap-16 p-8 md:p-10">
      <div className="index flex-1">
        <h3 className="text-xl md:text-3xl font-bold mb-4 text-primary">
          Materiale introduttivo
        </h3>
        <ul className="divide-y-2 divide-gray-200 divide-dashed mb-8 md:mb-0">
          {index
            .sort((a, b) => (a.number > b.number ? 1 : -1))
            .map((item) => {
              if (typeof item === "string")
                return (
                  <li className="font-bold py-2" key={item}>
                    {item}
                  </li>
                );
              else {
                if (item.title) {
                  return (
                    <li className="py-2" key={item.title}>
                      <Link href={`/${baseSlug}/${item.slug}`}>
                        <a>
                          <span className="font-medium text-md md:text-lg">
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
          <h3 className="text-xl md:text-3xl font-bold mb-4 text-primary">Appendici</h3>
          <ul className="divide-y-2 divide-transparent divide-dashed mb-8 md:mb-0">
            {notes
              .sort((a, b) => (a.number > b.number ? 1 : -1))
              .map((note) => (
                <li className="py-2" key={note.slug}>
                  <Link href={`/${baseSlug}/${note.slug}`}>
                    <a>
                      <span className="font-medium text-md md:text-lg">
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
        <div className="chapters md:pt-20 lg:pt-12 flex-1">
          <ul className="divide-y-2 divide-gray-200 divide-dashed">
            {chapters
              .sort((a, b) => (a.number > b.number ? 1 : -1))
              .map((chapter) => (
                <li className="py-2" key={chapter.slug ?? chapter.title}>
                  <Link
                    href={chapter.slug ? `/${baseSlug}/${chapter.slug}` : ""}
                  >
                    <a
                      className={classNames({
                        "text-gray-400": chapter.disabled,
                        "pointer-events-none": !chapter.slug
                      })}
                    >
                      <span className="font-medium text-lg">
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
