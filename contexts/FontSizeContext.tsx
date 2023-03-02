import { createContext, useEffect, useState } from "react";

export const fontSizes = ["text-base", "text-lg", "text-xl", "text-2xl"];
export type FontSizeType = "text-base" | "text-lg" | "text-xl" | "text-2xl";

export type FontSizeContextType = {
  fontSize: FontSizeType;
  setFontSize: (fontSize: FontSizeType) => void;
};

export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: "text-base",
  setFontSize: () => {},
});

export const FontSizeProvider: React.FC = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSizeType>("text-base");

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      setFontSize(savedFontSize as FontSizeType);
    }
  }, []);

  useEffect(() => {
    if (fontSize) {
      localStorage.setItem("fontSize", fontSize);
    }
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
