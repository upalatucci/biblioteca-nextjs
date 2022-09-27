import * as React from 'react'


const Footer: React.FC = () => {
  return (
    <footer className="relative bg-secondary text-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-12 lg:py-24 font-sans">
        <div className="flex flex-col md:flex-row">
            <div className="w-full lg:w-4/6 lg:mx-4 lg:pr-8">
            <h3 className="font-bold text-2xl">Istituto buddista italiano soka gakkai</h3>
            <p className="text-gray-400">TUTTI I SITI DELL&apos;ISTITUTO BUDDISTA ITALIANO SOKA GAKKAI:</p>

            </div>

            <div className="w-full lg:w-2/6 mt-8 lg:mt-0 lg:mx-4 lg:pr-8">
                <ul className="mt-4">
                    <li>
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        ilnuovorinascimento.org
                    </a>
                    </li>
                    <li className="mt-4">
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        buddismoesocieta.org
                    </a>
                    </li>
                    <li className="mt-4">
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        ilvolocontinuo.it
                    </a>
                    </li>
                    <li className="mt-4">
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        senzatomica.it
                    </a>
                    </li>
                </ul>
            </div>


            <div className="w-full lg:w-2/6 mt-8 lg:mt-0 lg:mx-4 lg:pr-8">
                <ul className="mt-4">
                    <li>
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        Scritti di Nichiren Daishonin I
                    </a>
                    </li>
                    <li className="mt-4">
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        Scritti di Nichiren Daishonin II
                    </a>
                    </li>
                    <li className="mt-4">
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        Sutra del Loto
                    </a>
                    </li>
                    <li className="mt-4">
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        Glossario
                    </a>
                    </li>
                    <li className="mt-4">
                    <a href="#" title="" className="flex items-center opacity-75 hover:opacity-100">
                        Ricerca avanzata
                    </a>
                    </li>
                </ul>
            </div>

        </div>

            <p className="text-sm text-center text-gray-400 mt-12">© Istituto Buddista Italiano Soka Gakkai 2010-2021 | Via di Bellagio 2/E 50141 Firenze FI | C.F.: 94069310483 | P.IVA: 04935120487 | privacy.
            </p>
    </footer>
  )
}

export default Footer;