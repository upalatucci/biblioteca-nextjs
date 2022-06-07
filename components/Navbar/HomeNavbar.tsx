import Link from "next/link";
import { useState } from "react";
import NavbarItem from "./NavbarItem";
import Logo from "../../public/istituto-buddista-soka-gakkai.svg";
import Image from "next/image";
import classNames from "classnames";

const CLOSE = "close";
const SHOW = "show";
const SHOWING = "showing";
const CLOSING = "closing";

const HomeNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(CLOSE);

  const closeMobileMenu = () => {
    if (mobileMenuOpen === CLOSE) {
      setMobileMenuOpen(SHOWING);
      setTimeout(() => setMobileMenuOpen(SHOW), 400);
    } else if (mobileMenuOpen === SHOW) {
      setMobileMenuOpen(CLOSING);
      setTimeout(() => setMobileMenuOpen(CLOSE), 400);
    }
  };

  return (
    <nav className="container">
      <Link href="/" passHref>
        <a>
          <Image src={Logo} alt="logo istituto buddista italiano soka gakkai" />
        </a>
      </Link>
      <button
        className={classNames("mobileMenu", {
          open: [SHOW, SHOWING].includes(mobileMenuOpen),
        })}
        onClick={closeMobileMenu}
      >
        <span className="ham"></span>
        <span className="ham"></span>
        <span className="ham"></span>
      </button>

      {mobileMenuOpen !== CLOSE && (
        <div className={`mobile-nav-items ${mobileMenuOpen}`}>
          <Link href="/rsnd-vol1" passHref>
            <a>Raccolta degli Scritti di Nichiren Daishonin VOLUME I</a>
          </Link>

          <Link href="/rsnd-vol1" passHref>
            <a>Raccolta degli Scritti di Nichiren Daishonin VOLUME II</a>
          </Link>

          <Link href="/rsnd-vol1" passHref>
            <a>Sutra del Loto</a>
          </Link>

          <Link href="/rsnd-vol1" passHref>
            <a>Glossario</a>
          </Link>
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
