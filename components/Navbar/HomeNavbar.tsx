import Link from "next/link";
import { useState } from "react";
import NavbarItem from "./NavbarItem";

const CLOSE = 1;
const SHOW = 3;
const CLOSING = 2;

const HomeNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(CLOSE);

  const closeMobileMenu = () => {
    if (mobileMenuOpen === CLOSE) setMobileMenuOpen(SHOW);
    else if (mobileMenuOpen === SHOW) {
      setMobileMenuOpen(CLOSING);
      setTimeout(() => setMobileMenuOpen(CLOSE), 400);
    }
  };

  return (
    <nav className="container">
      <Link href="/">SGI Logo</Link>
      <button className="mobileMenu" onClick={closeMobileMenu}>
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

      {mobileMenuOpen !== CLOSE && (
        <div
          className={`mobile-nav-items ${
            mobileMenuOpen === SHOW ? "show" : "hide"
          }`}
        >
          <Link href="/rsnd-vol1">
            Raccolta degli Scritti di Nichiren Daishonin VOLUME I
          </Link>

          <Link href="/rsnd-vol1">
            Raccolta degli Scritti di Nichiren Daishonin VOLUME II
          </Link>

          <Link href="/rsnd-vol1">Sutra del Loto</Link>

          <Link href="/rsnd-vol1">Glossario</Link>
        </div>
      )}

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
      <span className="nav-search">
        <Link href="/ricerca" passHref>
          <button className="primary">RICERCA</button>
        </Link>
      </span>
    </nav>
  );
};

export default HomeNavbar;
