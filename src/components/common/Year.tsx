"use client";

import { useEffect, useState } from "react";

/**
 * Anno corrente: prerender con l'anno di build, aggiornato sul client
 * (Cache Components non consente new Date() durante il prerender).
 */
const BUILD_YEAR = 2026;

export function Year() {
  const [currentYear, setCurrentYear] = useState(BUILD_YEAR);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronizzazione una tantum con l'orologio del client
    setCurrentYear(new Date().getFullYear());
  }, []);
  return <span>{currentYear}</span>;
}
