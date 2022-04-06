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
    <span className="navbar-item-root">
      {upText && <span className="upText">{upText}</span>}
      <span className="title">{title}</span>
      {downText && <span className="downText">{downText}</span>}
    </span>
  </Link>
);

export default NavbarItem;
