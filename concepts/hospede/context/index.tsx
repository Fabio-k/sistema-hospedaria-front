"use client";

import React, { createContext, useContext, useState } from "react";

interface FiltroContextValue {
  idade: number[];
  setIdade: (idade: number[]) => void;
  status: string[];
  setStatus: (status: string[]) => void;
}

const FiltroContext = createContext<FiltroContextValue | undefined>(undefined);

export function useFiltro() {
  const ctx = useContext(FiltroContext);
  if (!ctx) throw new Error("useFiltro must be used within FiltroProvider");
  return ctx;
}

export function FiltroProvider({ children }: { children: React.ReactNode }) {
  const [idade, setIdade] = useState<number[]>([18, 80]);
  const [status, setStatus] = useState<string[]>(["ATIVO", "INATIVO"]);
  return (
    <FiltroContext.Provider value={{ idade, setIdade, status, setStatus }}>
      {children}
    </FiltroContext.Provider>
  );
}
