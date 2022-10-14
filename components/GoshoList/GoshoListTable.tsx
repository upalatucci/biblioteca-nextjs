import Pagination, { usePagination } from "@components/Pagination";
import Link from "next/link";
import * as React from "react";
import { GoshoType } from "./GoshoList";
import GoshoTableSortButton from "./GoshoTableSortButton";
import { useOrder } from "./utils";

type GoshoListTableType = {
  items: GoshoType[];
};

const GoshoListTable: React.FC<GoshoListTableType> = ({ items }) => {
  const { sortedGosho, sortField, sortAscend, onSortChange } = useOrder(items);
  const goshoToShow = usePagination(sortedGosho);

  return (
    <>
      <table className="mt-4 text-xl w-full table-auto">
        <thead className="text-left">
          <tr>
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
        <tbody className="divide-y-2 divide-gray-300 divide-dashed">
          {goshoToShow.map((post: GoshoType) => (
            <tr key={post.slug}>
              <td width="5">
                <span className="mr-8 lg:mr-14">{post.number}.</span>{" "}
              </td>
              <td width="50%">
                <Link href={`/gosho/${post.slug}`}>
                  <a className="flex hover:text-primary py-3">
                    <span
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    ></span>
                  </a>
                </Link>
              </td>
              <td>{post.recipient}</td>
              <td>{post.place}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination totalResults={items.length} anchorHash="gosho-list" />
    </>
  );
};

export default GoshoListTable;
