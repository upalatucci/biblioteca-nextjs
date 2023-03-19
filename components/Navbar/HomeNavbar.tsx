import Link from "next/link";
import { useState } from "react";
import NavbarItem from "./NavbarItem";
import classNames from "classnames";
import useInstallPWA from "@hooks/useInstallPWA";

const CLOSE = "close";
const SHOW = "show";
const SHOWING = "showing";
const CLOSING = "closing";

const HomeNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(CLOSE);
  const [installable, install] = useInstallPWA();

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
            <img
              className="w-7 h-7 inline-block mr-2"
              src="/icons/ibisg.svg"
              alt="icona istituto buddista italiano soka gakkai"
            />
            <span className="text-white">
              Istituto Buddista Italiano Soka Gakkai
            </span>
          </a>
        </div>
      </div>
      <div className="px-8">
        <div className="container mx-auto text-center">
          <Link href="/" passHref>
            <a
              className="inline-block"
              aria-label="La Biblioteca di Nichiren, Home"
            >
              <h1 className="hidden lg:block text-center font-bold text-3xl md:text-5xl mb-8 mt-14 print:mt-0">
                La Biblioteca di Nichiren
              </h1>
            </a>
          </Link>
        </div>
        <nav className="container max-w-[1400px] mx-auto flex items-center justify-between mt-8 relative">
          <span className="lg:hidden"></span>
          <Link href="/" passHref>
            <a>
              <h1 className="lg:hidden text-center font-bold text-3xl md:text-5xl mx-4 self-center">
                La Biblioteca di Nichiren
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
            aria-label="hamburger menu"
            onClick={closeMobileMenu}
          >
            <span className="ham"></span>
            <span className="ham"></span>
            <span className="ham"></span>
          </button>

          {mobileMenuOpen !== CLOSE && (
            <div
              className={`px-4 py-2 z-40 shadow-md text-lg font-medium absolute top-28 h-[65vh] sm:h-[55vh] bg-white left-0 md:left-4 right-0 md:right-4 flex flex-col justify-evenly
          border rounded-3xl transition-all mobile-nav-items ${mobileMenuOpen}`}
            >
              <Link href="/rsnd-vol1" passHref>
                <a className="!text-left border-b border-gray-200 flex-1 flex flex-col justify-center">
                  <div>
                    Raccolta degli Scritti di
                    <br />
                    NICHIREN DAISHONIN{" "}
                    <span className="block text-sm text-gray-500 font-sans font-normal">
                      VOLUME I
                    </span>
                  </div>
                </a>
              </Link>

              <Link href="/rsnd-vol2" passHref>
                <a className="!text-left border-b border-gray-200 flex-1 flex flex-col justify-center">
                  <div>
                    Raccolta degli Scritti di
                    <br />
                    NICHIREN DAISHONIN{" "}
                    <span className="block text-sm text-gray-500 font-sans font-normal">
                      VOLUME II
                    </span>
                  </div>
                </a>
              </Link>

              <Link href="/sutra-del-loto" passHref>
                <a className="!text-left border-b border-gray-200 flex-1 flex flex-col justify-center">
                  <div>Sutra del Loto</div>
                </a>
              </Link>

              <Link href="/glossario" passHref>
                <a className="!text-left font-sans text-customYellow uppercase border-b border-gray-200 flex-1 flex flex-col justify-center">
                  <div>Glossario</div>
                </a>
              </Link>
              <Link href="/ricerca" passHref>
                <a className="!text-left font-sans text-primary uppercase flex-1 flex flex-col justify-center">
                  <div>Ricerca</div>
                </a>
              </Link>
              {installable && (
                <button
                  className="!text-left font-sans text-primary uppercase flex-1 flex flex-col justify-center"
                  onClick={install}
                >
                  Installa
                </button>
              )}
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
              <a className="btn bg-customYellow hover:bg-customYellowHover text-white text-base px-8 h-10 block rounded-3xl font-medium font-sans flex items-center">
                <span>GLOSSARIO</span>
              </a>
            </Link>

            <Link href="/ricerca" passHref>
              <a className="btn bg-primary hover:bg-primaryHover text-white text-base px-8 h-10 block rounded-3xl font-medium font-sans flex items-center">
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
