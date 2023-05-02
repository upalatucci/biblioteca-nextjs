import * as React from "react";
import Image from "next/image";

import BnIcon from "@public/sites/biblioteca-nichiren.svg"
import NRIcon from "@public/sites/nuovo-rinascimento.svg";
import BSIcon from "@public/sites/buddismo-societa.svg";
import IstitutoIcon from "@public/sites/istituto-buddista-italiano-soka-gakkai.svg";
import EreditaIcon from "@public/sites/eredita-della-vita.svg";
import OttoXMilleIcon from "@public/sites/otto-per-mille.svg";
import VoloIcon from "@public/sites/volo-continuo.svg";
import SenzatomicaIcon from "@public/sites/senzatomica.svg";
import Esperia from "@public/sites/esperia.svg";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#212833] text-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-12 lg:py-24 font-sans print:hidden">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10 justify-items-center">
        <div className="md:row-span-3 col-span-2 align-self-start md:justify-self-start">
          <a
              href="/"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={190}
                height={54}
                src={BnIcon}
                alt="La Biblioteca di Nichiren"
              />
          </a>
        </div>
        <div>
          <a
              href="https://www.sgi-italia.org/"
              target="_blank"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={188}
                height={50}
                src={IstitutoIcon}
                alt="istituto buddista italiano soka gakkai"
              />
            </a>
        </div>
        <div>
          <a
              href="https://senzatomica.it"
              target="_blank"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={130}
                height={48}
                src={SenzatomicaIcon}
                alt="senzamotica"
              />
            </a>
        </div>
        <div>
          <a
              href="https://www.ereditadellavita.it/"
              target="_blank"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={125}
                height={47}
                src={EreditaIcon}
                alt="Ereditá della vita"
              />
            </a>
        </div>
        <div>
          <a
              href="https://ottopermille.sokagakkai.it/"
              target="_blank"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={75}
                height={65}
                src={OttoXMilleIcon}
                alt="otto per mille"
              />
            </a>
        </div>
        <div>
          <a
              target="_blank"
              href="https://ilnuovorinascimento.org"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={150}
                height={26}
                src={NRIcon}
                alt="nuovo rinascimento"
              />
            </a>
        </div>
        <div>
          <a
              target="_blank"
              href="https://buddismoesocieta.org"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={190}
                height={29}
                src={BSIcon}
                alt="buddismo e societá"
              />
            </a>
        </div>
        <div>
          <a
              target="_blank"
              href="https://ilvolocontinuo.it"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={168}
                height={41}
                src={VoloIcon}
                alt="volo continuo"
              />
            </a>
        </div>
        <div>
          <a
              target="_blank"
              href="http://esperiashop.it"
              className="flex items-center hover:opacity-75"
              rel="noreferrer"
            >
              <Image
                width={85}
                height={28}
                src={Esperia}
                alt="esperia"
              />
            </a>
        </div>
      </div>
      

      <p className="text-sm text-gray-150 mt-12">
        © 2023 Soka Gakkai + Istituto Buddista Italiano Soka Gakkai. Tutti i diritti riservati. | Via di Bellagio 2/E
        50141 Firenze FI | C.F.: 94069310483 | P.IVA: 04935120487 | <a target="_blank" rel="nofollow noreferrer" href="https://privacy.sgi-italia.org/">Privacy & Cookie Policy.</a>
      </p>
    </footer>
  );
};

export default Footer;
