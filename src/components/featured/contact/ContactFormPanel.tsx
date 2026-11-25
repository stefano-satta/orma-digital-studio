"use client";

import { Suspense } from "react";
import { ContactForm } from "./ContactForm";
import { ServiceFromQuery } from "./ServiceFromQuery";
import { SubmissionSuccess } from "./SubmissionSuccess";
import { useContactForm } from "@/hooks/useContactForm";

/** Parte interattiva della sezione contatti: modulo oppure conferma d'invio. */
export function ContactFormPanel({ className }: { className?: string }) {
  const form = useContactForm();

  return (
    <div className={className}>
      <Suspense fallback={null}>
        <ServiceFromQuery onService={form.preselectService} />
      </Suspense>
      {form.status === "sent" ? <SubmissionSuccess id={form.statusMessageId} /> : <ContactForm form={form} />}
    </div>
  );
}
