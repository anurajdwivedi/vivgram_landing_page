"use client";

import { createContext, useContext } from "react";

export type BrandName = "Vivgram" | "MousApp";

interface BrandContextValue {
  brand: BrandName;
}

const BrandContext = createContext<BrandContextValue>({ brand: "Vivgram" });

export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandName;
  children: React.ReactNode;
}) {
  return (
    <BrandContext.Provider value={{ brand }}>{children}</BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}

/** Replace `{brand}` placeholders in text */
export function brandText(text: string, brand: BrandName) {
  return text.replace(/\{brand\}/g, brand);
}
