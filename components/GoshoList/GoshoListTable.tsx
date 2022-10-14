import Link from "next/link";
import * as React from "react";
import { GoshoType } from "./GoshoList";

type GoshoListTableType = {
  items: GoshoType[];
};

const GoshoListTable: React.FC<GoshoListTableType> = ({ items }) => (
  <table className="mt-4 text-xl w-full table-auto">
    <thead className="text-left">
      <tr>
        <th>N</th>
        <th>Nome</th>
        <th>Destinatario</th>
        <th>Luogo</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody className="divide-y-2 divide-gray-300 divide-dashed">
      {items.map((post: GoshoType, index: number) => (
        <tr key={post.slug}>
          <td width="5">
            <span className="mr-8 lg:mr-14">{index + 1}.</span>{" "}
          </td>
          <td width="50%">
            <Link href={`/gosho/${post.slug}`}>
              <a className="flex hover:text-primary py-3">
                <span>{post.title}</span>
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
);

export default GoshoListTable;
