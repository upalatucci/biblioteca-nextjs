import * as React from "react";

type GoshoTableSortButtonProps = {
  field: string;
  ascendent: boolean | undefined;
  onClick: (field: string, ascendent: boolean | undefined) => void;
  title: string;
};

const unOrderedIcon = (
  <svg
    className="fill-gray-400"
    height="1em"
    width="1em"
    viewBox="0 0 256 512"
    aria-hidden="true"
    role="img"
  >
    <path d="M214.059 377.941H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.12-15.119 4.412-40.971-16.97-40.971z"></path>
  </svg>
);

const discendentIcon = (
  <svg
    className="fill-primary"
    height="1em"
    width="1em"
    viewBox="0 0 256 512"
    aria-hidden="true"
    role="img"
  >
    <path d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z"></path>
  </svg>
);

const ascendentIcon = (
  <svg
    className="fill-primary"
    height="1em"
    width="1em"
    viewBox="0 0 256 512"
    aria-hidden="true"
    role="img"
  >
    <path d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z"></path>
  </svg>
);

const GoshoTableSortButton: React.FC<GoshoTableSortButtonProps> = ({
  field,
  ascendent,
  onClick,
  title
}) => {
  let icon = unOrderedIcon;

  if (ascendent !== undefined && ascendent) icon = ascendentIcon;
  else if (ascendent !== undefined) {
    icon = discendentIcon;
  }

  return (
    <th className="p-4 pt-6">
      <button
        onClick={() => onClick(field, !ascendent)}
        className="flex items-center font-sans text-lg"
      >
        {title}
        {icon}
      </button>
    </th>
  );
};

export default GoshoTableSortButton;
