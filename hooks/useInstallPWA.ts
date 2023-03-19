import { useEffect, useRef } from "react";

const useInstallPWA = (): [installable: boolean, install: () => void] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deferredPrompt = useRef<any>();

  useEffect(() => {
    const handlePWAPrompt: EventListener = (e) => {
      console.log(e);

      e.preventDefault();

      deferredPrompt.current = e;
    };

    window.addEventListener("beforeinstallprompt", handlePWAPrompt);

    () => window.removeEventListener("beforeinstallprompt", handlePWAPrompt);
  }, []);

  return [!!deferredPrompt.current, () => {
    deferredPrompt?.current?.prompt();
  }];
};

export default useInstallPWA;
