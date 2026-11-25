"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRESELECTED_SERVICE_PARAM } from "@/models/contactFormModel";

/**
 * Legge ?servizio=... dall'URL e lo comunica al modulo. Reagisce anche alla
 * navigazione interna (clic sulle CTA dei servizi senza ricaricare la pagina).
 */
export function ServiceFromQuery({ onService }: { onService: (serviceId: string) => void }) {
  const requestedServiceId = useSearchParams().get(PRESELECTED_SERVICE_PARAM);
  useEffect(() => {
    if (requestedServiceId) onService(requestedServiceId);
  }, [requestedServiceId, onService]);
  return null;
}
