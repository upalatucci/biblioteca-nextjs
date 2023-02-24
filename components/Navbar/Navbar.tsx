import Link from "next/link";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <nav className="container mx-auto">
      <Link href="/">SGI Logo</Link>
      <button className="mobileMenu">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="navItems">
        <NavbarItem
          href="/"
          upText="Raccolta degli Scritti di"
          title="NICHIREN DAISHONIN"
          downText="VOLUME I"
        />

        <NavbarItem
          href="/"
          upText="Raccolta degli Scritti di"
          title="NICHIREN DAISHONIN"
          downText="VOLUME II"
        />

        <NavbarItem href="/sutra-del-loto" title="SUTRA DEL LOTO" />

        <NavbarItem href="/glossario" title="GLOSSARIO" />
      </div>
      <button className="primary">RICERCA</button>
    </nav>
  );
};

export default Navbar;
