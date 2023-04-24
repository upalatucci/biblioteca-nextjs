import { useEffect, useState } from "react";

const useCookiePolicy = () => {
  const [cookiePolicy, setCookiePolicy] = useState<boolean | undefined>();

  useEffect(() => {
    const savedCookiePolicy = localStorage.getItem("cookiePolicy");
    if (savedCookiePolicy) {
      const policies = JSON.parse(savedCookiePolicy);
      setCookiePolicy(policies?.analitics);
    }
  }, []);

  const handleCookiePolicy = (analiticsValue: boolean) => {
    localStorage.setItem(
      "cookiePolicy",
      JSON.stringify({ analitics: analiticsValue })
    );
    setCookiePolicy(analiticsValue);
  };

  return { cookiePolicy, handleCookiePolicy };
};

export default useCookiePolicy;
