import * as React from "react";

type GoshoTableSortButtonProps = {
  field: string;
  ascendent: boolean | undefined;
  onClick: (field: string, ascendent: boolean | undefined) => void;
  title: string;
};

const unOrderedIcon = (
  <svg
    id="Order"
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="10"
    className="ml-2"
    viewBox="0 0 16.8 4.5"
  >
    <path
      id="Icon_ionic-md-arrow-dropdown"
      data-name="Icon ionic-md-arrow-dropdown"
      d="M9,13.5,13.5,18,18,13.5Z"
      transform="translate(-9 -13.5)"
      fill="#0e83a4"
    />
    <path
      id="Icon_ionic-md-arrow-dropup"
      data-name="Icon ionic-md-arrow-dropup"
      d="M9,18l4.5-4.5L18,18Z"
      transform="translate(-1.2 -13.5)"
      fill="#0e83a4"
    />
  </svg>
);

const discendentIcon = (
  <svg
    id="Order"
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="10"
    className="ml-2"
    viewBox="0 0 16.8 4.2"
  >
    <path
      id="Icon_ionic-md-arrow-dropup"
      data-name="Icon ionic-md-arrow-dropup"
      d="M9,18l4.5-4.5L18,18Z"
      transform="translate(-9 -13.5)"
      fill="#0e83a4"
    />
  </svg>
);

const ascendentIcon = (
  <svg
    id="Order"
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="10"
    className="ml-2"
    viewBox="0 0 16.8 4.2"
  >
    <path
      id="Icon_ionic-md-arrow-dropdown"
      data-name="Icon ionic-md-arrow-dropdown"
      d="M9,13.5,13.5,18,18,13.5Z"
      transform="translate(-9 -13.5)"
      fill="#0e83a4"
    />
  </svg>
);

const GoshoTableSortButton: React.FC<GoshoTableSortButtonProps> = ({
  field,
  ascendent,
  onClick,
  title,
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
        className="flex items-center font-sans"
      >
        {title}
        {icon}
      </button>
    </th>
  );
};

export default GoshoTableSortButton;
