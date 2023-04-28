import * as React from "react";
import Image from "next/image";

import NRIcon from "@public/sites/nuovo-rinascimento.svg";
import BSIcon from "@public/sites/buddismo-societa.svg";
import IstitutoIcon from "@public/sites/istituto-buddista-italiano-soka-gakkai.svg";
import EreditaIcon from "@public/sites/eredita-della-vita.svg";
import OttoXMilleIcon from "@public/sites/otto-per-mille.svg";
import VoloIcon from "@public/sites/volo-continuo.svg";
import SenzatomicaIcon from "@public/sites/senzatomica.svg";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0D2444] text-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-12 lg:py-24 font-sans print:hidden">
      <div className="grid grid-cols-6 gap-2">
        <div className="row-span-3 col-span-2">
          <a
              href="https://www.sgi-italia.org/"
              target="_blank"
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={190}
                height={54}
                src={IstitutoIcon}
                alt="La Biblioteca di Nichiren"
              />
          </a>
        </div>
        <div>
          <a
              href="https://www.sgi-italia.org/"
              target="_blank"
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={150}
                height={100}
                src={IstitutoIcon}
                alt="istituto buddista italiano soka gakkai"
              />
            </a>
        </div>
        <div>
          <a
              href="https://senzatomica.it"
              target="_blank"
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={150}
                height={100}
                src={SenzatomicaIcon}
                alt="senzamotica"
              />
            </a>
        </div>
        <div>
          <a
              href="https://www.ereditadellavita.it/"
              target="_blank"
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={150}
                height={100}
                src={EreditaIcon}
                alt="Ereditá della vita"
              />
            </a>
        </div>
        <div>
          <a
              href="https://ottopermille.sokagakkai.it/"
              target="_blank"
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={150}
                height={100}
                src={OttoXMilleIcon}
                alt="otto per mille"
              />
            </a>
        </div>
        <div>
          <a
              href="https://ilnuovorinascimento.org"
              title=""
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={180}
                height={120}
                src={NRIcon}
                alt="nuovo rinascimento"
              />
            </a>
        </div>
        <div>
          <a
              href="https://buddismoesocieta.org"
              title=""
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={180}
                height={120}
                src={BSIcon}
                alt="buddismo e societá"
              />
            </a>
        </div>
        <div>
          <a
              href="https://ilvolocontinuo.it"
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={180}
                height={120}
                src={VoloIcon}
                alt="volo continuo"
              />
            </a>
        </div>
        <div>
          <a
              href="https://ilvolocontinuo.it"
              className="flex items-center opacity-75 hover:opacity-150"
              rel="noreferrer"
            >
              <Image
                width={180}
                height={120}
                src={VoloIcon}
                alt="esperia"
              />
            </a>
        </div>
      </div>
      

      <p className="text-sm text-center text-gray-150 mt-12">
        © Istituto Buddista Italiano Soka Gakkai 2010-2021 | Via di Bellagio 2/E
        50141 Firenze FI | C.F.: 94069310483 | P.IVA: 04935120487 | <a rel="nofollow" href="https://privacy.sgi-italia.org/">Privacy & Cookie Policy.</a>
      </p>
    </footer>
  );
};

export default Footer;
