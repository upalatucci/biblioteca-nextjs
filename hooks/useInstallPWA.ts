import { useEffect, useState } from "react";

let deferredPromptGlobal = null;

const useInstallPWA = (): [installable: boolean, install: () => void] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] =
    useState<any>(deferredPromptGlobal);

  useEffect(() => {
    const handlePWAPrompt = (installPromptEvent) => {
      setDeferredPrompt(installPromptEvent);
      deferredPromptGlobal = installPromptEvent;
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      deferredPromptGlobal = null;
    };

    window.addEventListener("beforeinstallprompt", handlePWAPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePWAPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return [
    !!deferredPrompt,
    async () => {
      deferredPrompt?.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      setDeferredPrompt(null);
      deferredPromptGlobal = null;
      // Act on the user's choice
      if (outcome === "accepted") {
        console.log("User accepted the install prompt.");
      } else if (outcome === "dismissed") {
        console.log("User dismissed the install prompt");
      }
    },
  ];
};

export default useInstallPWA;
