import { useEffect, useState } from "react";

const useInstallPWA = (): [installable: boolean, install: () => void] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>();

  useEffect(() => {
    const handlePWAPrompt = (installPromptEvent) => {
      setDeferredPrompt(installPromptEvent);
    };

    const handleAppInstalled = () => setDeferredPrompt(null)

    window.addEventListener("beforeinstallprompt", handlePWAPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
        window.removeEventListener("beforeinstallprompt", handlePWAPrompt);
        window.removeEventListener("appinstalled", handleAppInstalled);
    }
  }, []);

  return [!!deferredPrompt, async () => {
    deferredPrompt?.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    // Act on the user's choice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('User dismissed the install prompt');
    }

  }];
};

export default useInstallPWA;
