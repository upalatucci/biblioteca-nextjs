import Link from "next/link";
import { useState } from "react";
import NavbarItem from "./NavbarItem";
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
      <Link href="/" passHref>
        <a>
          <h1 className="hidden lg:block text-center font-bold text-3xl md:text-5xl mb-8 mt-14">
            NICHIREN Library
          </h1>
        </a>
      </Link>
      <nav className="container max-w-[1200px] mx-auto px-8 lg:px-8 flex items-center justify-between my-14 relative">
        <span className="lg:hidden"></span>
        <Link href="/" passHref>
          <a>
            <h1 className="lg:hidden text-center font-bold text-3xl md:text-5xl mx-4 self-center">
              NICHIREN Library
            </h1>
          </a>
        </Link>
        <button
          className={classNames(
            "mobileMenu block relative lg:hidden w-12 h-10",
            {
              open: [SHOW, SHOWING].includes(mobileMenuOpen)
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

        <div className="hidden lg:flex items-center justify-start gap-10 xl:gap-20 w-full">
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
        </div>
        <span className="hidden lg:flex gap-10">
          <Link href="/glossario" passHref>
            <a className="btn bg-customYellow hover:bg-customYellowHover text-white px-8 h-10 block border rounded-3xl font-bold font-sans flex items-center">
              <span>Glossario</span>
            </a>
          </Link>

          <Link href="/ricerca" passHref>
            <a className="btn bg-primary hover:bg-primaryHover text-white px-8 h-10 block border rounded-3xl font-bold font-sans flex items-center">
              <span>RICERCA</span>
            </a>
          </Link>
        </span>
      </nav>
    </>
  );
};

export default HomeNavbar;
