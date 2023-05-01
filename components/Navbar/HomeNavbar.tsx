import Link from "next/link";
import { useState } from "react";
import NavbarItem from "./NavbarItem";
import classNames from "classnames";
import useInstallPWA from "@hooks/useInstallPWA";
import Image from "next/image";
import Logo from "@public/biblioteca-nichiren-logo.svg";
import { useRouter } from "next/router";

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

  const router = useRouter();
  const isHomepage = router.pathname === "/";

  return (
    <header className="pb-14 relative">
      <div className="top-bar bg-[#212833] px-8 py-2">
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
            <span className="text-white hidden lg:block">
              Istituto Buddista Italiano Soka Gakkai
            </span>
          </a>
        </div>
      </div>

      <div className="container max-w-[1406px] mx-auto relative top-[-44px] px-8">
        <Link
          href="/"
          className={`bg-customYellow rounded-b-3xl px-4 md:px-6 pt-12 pb-4 md:pb-6 mr-4 md:mr-0 max-w-[250px] md:max-w-none z-10 hidden md:block absolute top-0 transition-all origin-top ${
            isHomepage
              ? "right-[10%] md:right-[20%] xl:right-[50%] scale-75 xl:scale-100 translate-x-1/2"
              : "right-0 scale-75 translate-x-[10%]"
          }`}
          aria-label="La Biblioteca di Nichiren, Home"
        >
          <Image src={Logo} alt="logo" priority width={300} height={150} />
        </Link>

        <Link
          href="/"
          className="inline-block bg-customYellow rounded-b-3xl px-4 md:px-6 pt-12 pb-4 md:pb-6 mr-4 md:mr-0 max-w-[250px] md:hidden  md:max-w-none z-10 absolute top-0 right-4 sm:right-10"
          aria-label="La Biblioteca di Nichiren, Home"
        >
          <Image
            className="logo-bn"
            src={Logo}
            alt="logo"
            priority
            width={300}
            height={150}
          />
        </Link>
      </div>

      <div className="px-8">
        <nav
          className={`container max-w-[1400px] mx-auto flex items-center justify-between ${
            isHomepage ? "mt-8 md:mt-14" : "mt-8 lg:mt-2"
          } relative`}
        >
          <button
            className={classNames(
              "mobileMenu block relative lg:hidden w-12 h-8",
              {
                open: [SHOW, SHOWING].includes(mobileMenuOpen),
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
              <Link
                href="/rsnd-vol1"
                className="!text-left border-b border-gray-200 flex-1 flex flex-col justify-center"
                onClick={closeMobileMenu}
              >
                <div>
                  Raccolta degli Scritti di
                  <br />
                  NICHIREN DAISHONIN{" "}
                  <span className="block text-sm text-gray-500 font-sans font-normal">
                    VOLUME I
                  </span>
                </div>
              </Link>

              <Link
                href="/rsnd-vol2"
                className="!text-left border-b border-gray-200 flex-1 flex flex-col justify-center"
                onClick={closeMobileMenu}
              >
                <div>
                  Raccolta degli Scritti di
                  <br />
                  NICHIREN DAISHONIN{" "}
                  <span className="block text-sm text-gray-500 font-sans font-normal">
                    VOLUME II
                  </span>
                </div>
              </Link>

              <Link
                href="/sutra-del-loto"
                className="!text-left border-b border-gray-200 flex-1 flex flex-col justify-center"
                onClick={closeMobileMenu}
              >
                <div>Sutra del Loto</div>
              </Link>

              <Link
                href="/glossario"
                className="!text-left font-sans text-primary uppercase border-b border-gray-200 flex-1 flex flex-col justify-center"
                onClick={closeMobileMenu}
              >
                <div>Glossario</div>
              </Link>
              <Link
                href="/ricerca"
                className="!text-left font-sans text-primary uppercase flex-1 flex flex-col justify-center"
                onClick={closeMobileMenu}
              >
                <div>Ricerca</div>
              </Link>
              {installable && (
                <button
                  className="!text-left font-sans text-customYellow uppercase flex-1 flex flex-col justify-center border-t border-gray-200"
                  onClick={() => {
                    closeMobileMenu();
                    install();
                  }}
                >
                  Installa
                </button>
              )}
            </div>
          )}

          <div className="text-black hidden lg:flex items-center justify-start gap-10 w-full md:pt-24">
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
          <span className="hidden lg:flex gap-10  md:pt-24">
            <Link
              href="/glossario"
              className="btn border-2 border-primary hover:bg-white text-primary text-base px-8 h-10 block rounded-3xl font-medium font-sans flex items-center"
            >
              <span>GLOSSARIO</span>
            </Link>

            <Link
              href="/ricerca"
              className="btn bg-primary hover:bg-primaryHover text-white text-base px-8 h-10 block rounded-3xl font-medium font-sans flex items-center"
            >
              <span>RICERCA</span>
            </Link>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default HomeNavbar;
