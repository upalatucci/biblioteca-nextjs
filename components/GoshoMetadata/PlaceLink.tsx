import Link from "next/link";
import React from "react";

type PlaceLinkProps = {
  place: string;
  rsndLink: string;
};

const PlaceLink: React.FC<PlaceLinkProps> = ({ rsndLink, place }) => {
  if (!place) return null;

  return (
    <Link
      href={{
        pathname: rsndLink,
        query: { place },
        hash: "gosho-list",
      }}
      className="hover:primaryHover underline"
    >
      {place}
    </Link>
  );
};

export default PlaceLink;
