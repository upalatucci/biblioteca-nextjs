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
    <a>
      <span className="flex flex-col">
        {upText && <span className="font-sm">{upText}</span>}
        <span className="font-lg font-bold font-sans hover:text-primary">{title}</span>
        {downText && <span className="font-sm font-sans text-primary">{downText}</span>}
      </span>
    </a>
  </Link>
);

export default NavbarItem;
