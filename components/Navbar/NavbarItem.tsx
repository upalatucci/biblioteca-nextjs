import Link from "next/link";
import React from "react";

type NavbarItemProps = {
  upText?: string;
  title: string;
  downText?: string;
  href: string;
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  upText,
  title,
  downText,
  href,
}) => (
  <Link href={href} passHref>
    <span className="flex flex-col font-sans">
      <span className="font-serif text-lg font-medium hover:text-primary leading-4">
        {upText && <div className="text-base">{upText}</div>}
        {title}
      </span>
      {downText && <span className="text-sm text-gray-500">{downText}</span>}
    </span>
  </Link>
);

export default NavbarItem;
