import Pagination, { usePagination } from "@components/Pagination";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { GoshoType } from "./GoshoList";
import GoshoTableSortButton from "./GoshoTableSortButton";
import { UseOrderType } from "./utils";

type GoshoListTableType = {
  sortedGosho: UseOrderType["sortedGosho"];
  sortField: UseOrderType["sortField"];
  sortAscend: UseOrderType["sortAscend"];
  onSortChange: UseOrderType["onSortChange"];
};

const ItalianListFormatted = new Intl.ListFormat("it", {
  style: "long",
  type: "conjunction",
});

const GoshoListTable: React.FC<GoshoListTableType> = ({
  sortedGosho,
  sortField,
  sortAscend,
  onSortChange,
}) => {
  const goshoToShow = usePagination(sortedGosho);

  return (
    <>
      <table className="mt-4 text-md md:text-lg w-full table-auto bg-white rounded-3xl border-collapse">
        <thead className="text-left">
          <tr className="border-b-2 border-primary">
            <GoshoTableSortButton
              title="N"
              field="number"
              onClick={onSortChange}
              ascendent={sortField === "number" ? sortAscend : undefined}
            />
            <GoshoTableSortButton
              title="Nome"
              field="title"
              onClick={onSortChange}
              ascendent={sortField === "title" ? sortAscend : undefined}
            />
            <GoshoTableSortButton
              title="Destinatario"
              field="recipient"
              onClick={onSortChange}
              ascendent={sortField === "recipient" ? sortAscend : undefined}
            />
            <GoshoTableSortButton
              title="Luogo"
              field="place"
              onClick={onSortChange}
              ascendent={sortField === "place" ? sortAscend : undefined}
            />
            <GoshoTableSortButton
              title="Data"
              field="date"
              onClick={onSortChange}
              ascendent={sortField === "date" ? sortAscend : undefined}
            />
          </tr>
        </thead>
        <tbody className="rounded-full">
          {goshoToShow.map((post: GoshoType, postIndex: number) => (
            <tr
              key={post.slug}
              className={classNames("bg-defaultBg", {
                "!bg-white": postIndex % 2,
              })}
            >
              <td width="5" className="px-4 py-2">
                <span className="mr-8 lg:mr-14 font-medium">
                  {post.number}.
                </span>{" "}
              </td>
              <td width="50%" className="px-4 py-2">
                <Link
                  href={`/rsnd/${post.slug}`}
                  className="flex hover:text-primary py-3 font-medium"
                >
                  <span dangerouslySetInnerHTML={{ __html: post.title }}></span>
                </Link>
              </td>
              <td width="20%" className="px-4 py-2 font-medium">
                {ItalianListFormatted.format(post.recipient)}
              </td>
              <td width="17%" className="px-4 py-2 font-medium">
                {post.place}
              </td>
              <td width="10%" className="px-4 py-2 font-medium">
                {post.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination totalResults={sortedGosho.length} anchorHash="gosho-list" />
    </>
  );
};

export default GoshoListTable;
