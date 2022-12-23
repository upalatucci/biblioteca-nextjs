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
    <>
      <h1 className="hidden lg:block text-center font-bold text-3xl md:text-5xl mb-8 mt-4">
        NICHIREN Library
      </h1>
      <nav className="container mx-auto px-8 lg:px-8 flex items-center justify-between mb-4 relative mt-4 lg:mt-0">
        <Link href="/" passHref>
          <a className="flex w-12 h-12 md:w-20 md:h-20">
            <Image
              src={Logo}
              alt="logo istituto buddista italiano soka gakkai"
            />
          </a>
        </Link>
        <h1 className="lg:hidden text-center font-bold text-3xl md:text-5xl">
          NICHIREN Library
        </h1>
        <button
          className={classNames(
            "mobileMenu block relative lg:hidden w-12 h-10",
            {
              open: [SHOW, SHOWING].includes(mobileMenuOpen),
            }
          )}
          onClick={closeMobileMenu}
        >
          <span className="ham"></span>
          <span className="ham"></span>
          <span className="ham"></span>
        </button>

        {mobileMenuOpen !== CLOSE && (
          <div
            className={`p-2 z-40 shadow-sm absolute top-28 h-80 bg-white left-4 md:left-0 right-4 md:right-0 flex flex-col items-center justify-evenly
         border rounded-md transition-all mobile-nav-items ${mobileMenuOpen}`}
          >
            <Link href="/rsnd-vol1" passHref>
              <a>Raccolta degli Scritti di Nichiren Daishonin VOLUME I</a>
            </Link>

            <Link href="/rsnd-vol2" passHref>
              <a>Raccolta degli Scritti di Nichiren Daishonin VOLUME II</a>
            </Link>

            <Link href="/rsnd-vol1" passHref>
              <a>Sutra del Loto</a>
            </Link>

            <Link href="/glossario" passHref>
              <a>Glossario</a>
            </Link>
            <Link href="/ricerca" passHref>
              <a>Ricerca</a>
            </Link>
          </div>
        )}

        <div className="hidden lg:flex items-center justify-evenly w-full">
          <NavbarItem
            href="/rsnd-vol1"
            upText="Raccolta degli Scritti di"
            title="NICHIREN DAISHONIN"
            downText="VOLUME I"
          />

          <NavbarItem
            href="/rsnd-vol2"
            upText="Raccolta degli Scritti di"
            title="NICHIREN DAISHONIN"
            downText="VOLUME II"
          />

          <NavbarItem href="/" title="SUTRA DEL LOTO" />

          <NavbarItem href="/glossario" title="GLOSSARIO" />
        </div>
        <span className="hidden lg:block">
          <Link href="/ricerca" passHref>
            <button className="btn bg-primary hover:bg-primaryHover text-white px-8 h-10 border rounded-3xl font-bold font-sans ">
              RICERCA
            </button>
          </Link>
        </span>
      </nav>
    </>
  );
};

export default HomeNavbar;
