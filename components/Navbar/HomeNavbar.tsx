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
    <header className="pb-14">
      <div className="top-bar bg-neutral-800 px-8 py-2">
        <div className="container max-w-[1406px] mx-auto ">
          <a
            href="https://www.sgi-italia.org"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <img className="w-7 h-7 inline-block mr-2" src="/icons/ibisg.svg" />
            <span className="text-white">
              Istituto Buddista Italiano Soka Gakkai
            </span>
          </a>
        </div>
      </div>
      <div className="px-8">
        <div className="container mx-auto text-center">
          <Link href="/" passHref>
            <a className="inline-block">
              <h1 className="hidden lg:block text-center font-bold text-3xl md:text-5xl mb-8 mt-14">
                NICHIREN Library
              </h1>
            </a>
          </Link>
        </div>
        <nav className="container max-w-[1400px] mx-auto flex items-center justify-between mt-14 relative">
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
              className={`p-2 z-40 shadow-md absolute top-28 h-80 bg-white left-4 md:left-0 right-4 md:right-0 flex flex-col items-center justify-evenly
          border rounded-md transition-all mobile-nav-items ${mobileMenuOpen}`}
            >
              <Link href="/rsnd-vol1" passHref>
                <a>Raccolta degli Scritti di Nichiren Daishonin VOLUME I</a>
              </Link>

              <Link href="/rsnd-vol2" passHref>
                <a>Raccolta degli Scritti di Nichiren Daishonin VOLUME II</a>
              </Link>

              <Link href="/sutra-del-loto" passHref>
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

          <div className="text-black hidden lg:flex items-center justify-start gap-10 w-full">
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

            <NavbarItem href="/sutra-del-loto" title="SUTRA DEL LOTO" />
          </div>
          <span className="hidden lg:flex gap-10">
            <Link href="/glossario" passHref>
              <a className="btn bg-customYellow hover:bg-customYellowHover text-white text-xl px-8 h-10 block border rounded-3xl font-medium font-sans flex items-center">
                <span>GLOSSARIO</span>
              </a>
            </Link>

            <Link href="/ricerca" passHref>
              <a className="btn bg-primary hover:bg-primaryHover text-white text-xl px-8 h-10 block border rounded-3xl font-medium font-sans flex items-center">
                <span>RICERCA</span>
              </a>
            </Link>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default HomeNavbar;
