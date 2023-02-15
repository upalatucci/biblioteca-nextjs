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
  href
}) => (
  <Link href={href} passHref>
    <a>
      <span className="flex flex-col font-sans">
        <span className="font-lg font-bold hover:text-primary">
          {upText && <div className="text-sm">{upText}</div>}
          {title}
        </span>
        {downText && <span className="text-sm text-gray">{downText}</span>}
      </span>
    </a>
  </Link>
);

export default NavbarItem;
