import { createContext, useEffect, useState } from "react";

export const fontSizes = ["text-lg", "text-xl", "text-2xl", "text-3xl"];
export type FontSizeType = "text-lg" | "text-xl" | "text-2xl" | "text-3xl";

export type FontSizeContextType = {
  fontSize: FontSizeType;
  setFontSize: (fontSize: FontSizeType) => void;
};

export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: "text-lg",
  setFontSize: () => {},
});

export const FontSizeProvider: React.FC = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSizeType>("text-lg");

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
