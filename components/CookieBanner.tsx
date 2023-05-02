import useCookiePolicy from "@hooks/useCookiePolicy";
import { useEffect, useState } from "react";
import CloseIcon from "@public/icons/ico-close.svg";
import Image from "next/image";

const CookieBanner = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [withStatistics, setWithStatistics] = useState(true);

  const { cookiePolicy, handleCookiePolicy } = useCookiePolicy();
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const onClose = () => {
    setShowCookieBanner(false);
  };

  const handleBannerPolicy = (value: boolean) => {
    handleCookiePolicy(value);
    onClose();
  };

  useEffect(() => {
    if (cookiePolicy === null) {
      setTimeout(() => setShowCookieBanner(true), 1000);
    } else if (cookiePolicy !== undefined) {
      setWithStatistics(cookiePolicy);
    }
  }, [cookiePolicy]);

  if (!showCookieBanner)
    return (
      <div
        className="fixed transition-all bottom-[-28px] hover:bottom-0 right-10 p-2 pt-4 hover:pt-2 shadow-md border rounded-t-xl bg-defaultBg cursor-pointer"
        onClick={() => setShowCookieBanner(true)}
      >
        <span className="text-sm">Gestisci consenso</span>
      </div>
    );

  return (
    <div className="bg-defaultBg fixed w-full md:w-auto md:max-w-[550px] left-0 right-0 bottom-0 md:left-auto md:right-4 md:bottom-4 rounded-3xl shadow-md p-4 md:p-8 z-10">
      <div className="text-lg mb-4 text-center flex justify-evenly">
        <div />
        <span className="flex-1">Gestisci Consenso Cookie</span>
        <button onClick={onClose}>
          <Image src={CloseIcon} alt="close icon" width={32} height={32} />
        </button>
      </div>
      <p className="mb-6 text-sm md:text-md">
        Per fornire le migliori esperienze, utilizziamo tecnologie come i cookie
        per memorizzare e/o accedere alle informazioni del dispositivo. Il
        consenso a queste tecnologie ci permetterà di elaborare dati come il
        comportamento di navigazione o ID unici su questo sito. Non acconsentire
        o ritirare il consenso può influire negativamente su alcune
        caratteristiche e funzioni.
      </p>

      {showDetails && (
        <ul className="w-full divide-y-2 mb-6">
          <li className="flex py-4">
            <span className="flex-1">Funzionale</span>{" "}
            <span className="flex justify-center w-32 text-primary">
              Sempre Attivo
            </span>
          </li>
          <li className="flex py-4">
            <span className="flex-1">Statistiche</span>
            <span className="flex justify-center w-32">
              <input
                type="checkbox"
                value="statistics"
                onChange={(event) => setWithStatistics(event.target.checked)}
                checked={withStatistics}
                className="cursor-pointer"
              />
            </span>
          </li>
        </ul>
      )}

      <div className="flex gap-4 mb-4">
        <button
          type="button"
          className="flex-1 btn bg-primary hover:bg-primaryHover rounded-3xl h-10 text-white min-w-[100px]"
          onClick={() => handleBannerPolicy(true)}
        >
          Accetta
        </button>
        <button
          type="button"
          className="flex-1 btn border border-primary text-primary hover:bg-white rounded-3xl min-w-[100px] h-10"
          onClick={() => handleBannerPolicy(false)}
        >
          Nega
        </button>

        {showDetails ? (
          <button
            type="button"
            className="flex-1 btn border border-primary text-primary hover:bg-white rounded-3xl min-w-[100px] h-10"
            onClick={() => handleBannerPolicy(withStatistics)}
          >
            Salva
          </button>
        ) : (
          <button
            type="button"
            className="flex-1 btn border border-primary text-primary hover:bg-white rounded-3xl min-w-[100px] h-10"
            onClick={() => setShowDetails(!showDetails)}
          >
            Preferenze
          </button>
        )}
      </div>
      <div className="text-center">
        <a
          href="https://privacy.sgi-italia.org/"
          className="underline text-primary hover:text-primaryHover"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default CookieBanner;
