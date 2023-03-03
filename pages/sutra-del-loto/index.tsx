import Head from "next/head";
import BookDescription from "@components/BookDescription";
import HomeNavbar from "@components/Navbar/HomeNavbar";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import GoshoListSkeleton from "@components/GoshoList/GoshoListSkeleton";
import IntroSDL from "@books/intro_sdl.json";
import Link from "next/link";
import classNames from "classnames";
import GoshoTableSortButton from "@components/GoshoList/GoshoTableSortButton";

export default function RSND1() {
  const [jsonData, setJSONData] = useState<any[]>([]);

  const [sortField, setSortField] = useState("number");
  const [sortAscend, setSortAscend] = useState(true);

  useEffect(() => {
    import("@books/sdl.json").then((goshoData) => {
      return setJSONData(goshoData.default);
    });
  }, []);

  const onSortChange = (field, ascendent) => {
    setSortAscend(ascendent);
    setSortField(field);
  };

  let sortedData = jsonData;

  if (sortField)
    sortedData = jsonData.sort((a, b) =>
      a[sortField] > b[sortField] ? 1 : -1
    );

  if (!sortAscend) {
    sortedData = sortedData.reverse();
  }

  return (
    <>
      <Head>
        <title>Sutra del Loto | NICHIREN Library</title>
      </Head>

      <HomeNavbar />
      <main>
        {IntroSDL && (
          <BookDescription
            index={IntroSDL}
            title="Sutra del Loto"
            baseSlug="sutra-del-loto"
            chapters={[
              {
                number: 0,
                title: "Sutra degli innumerevoli significati",
                disabled: true
              },
              {
                number: 1,
                title: "Sutra del Loto"
              },
              {
                number: 2,
                title:
                  "Sutra per la pratica della meditazione sul bodhisattva virtu universale",
                disabled: true
              }
            ]}
          />
        )}
        {jsonData.length > 0 ? (
          <section className="py-20 lg:py-32 px-8" id="gosho-list">
            <div className="container py-8 min-h-[50vh] mx-auto max-w-6xl">
              <h2 className="text-4xl md:text-3xl text-primary font-bold mb-8">
                Capitoli del Sutra del Loto
              </h2>

              <div className="overflow-auto pb-4">
                <table className="mt-4 text-xl w-full table-auto bg-white rounded-3xl border-collapse">
                  <thead className="text-left">
                    <tr className="border-b-2 border-primary">
                      <GoshoTableSortButton
                        title="N"
                        field="number"
                        onClick={onSortChange}
                        ascendent={
                          sortField === "number" ? sortAscend : undefined
                        }
                      />
                      <GoshoTableSortButton
                        title="Nome"
                        field="title"
                        onClick={onSortChange}
                        ascendent={
                          sortField === "title" ? sortAscend : undefined
                        }
                      />
                    </tr>
                  </thead>
                  <tbody className="rounded-full">
                    {sortedData.map((post: any, postIndex: number) => (
                      <tr
                        key={post.slug}
                        className={classNames("bg-defaultBg", {
                          "!bg-white": postIndex % 2
                        })}
                      >
                        <td width="5" className="px-4 py-2">
                          <span className="mr-8 lg:mr-14  font-medium">{post.number}</span>{" "}
                        </td>
                        <td className="px-4 py-2  font-medium">
                          <Link href={`/sutra-del-loto/${post.slug}`}>
                            <a className="flex hover:text-primary py-3">
                              <span
                                dangerouslySetInnerHTML={{ __html: post.title }}
                              ></span>
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          <GoshoListSkeleton />
        )}
      </main>
      <Footer />
    </>
  );
}
