import Link from "next/link";
import NavbarItem from "./NavbarItem";

const HomeNavbar = () => {
  return (
    <nav className="container">
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
          href="/rsnd-vol1"
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

        <NavbarItem href="/" title="SUTRA DEL LOTO" />

        <NavbarItem href="/" title="GLOSSARIO" />
      </div>
      <Link href="/ricerca" passHref>
        <button className="primary">RICERCA</button>
      </Link>
    </nav>
  );
};

export default HomeNavbar;
