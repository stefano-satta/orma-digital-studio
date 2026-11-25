import { site } from "@/content/site";
import { priceBands } from "@/content/pricing";

export const PROPERTY_TYPES = [
  "B&B",
  "Guest house",
  "Agriturismo",
  "Villa",
  "Casa vacanza",
  "Piccolo resort",
  "Dimora",
  "Struttura in apertura",
  "Altro",
] as const;

/** Opzioni della select "Budget": le stesse fasce mostrate sulle pagine servizio (content/pricing.ts). */
export const BUDGET_RANGES = ["Da definire", ...Object.values(priceBands).map((priceBand) => priceBand.label)];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 20;

/** Parametro URL con cui le CTA dei servizi preselezionano un servizio nel modulo (es. ?servizio=digital-growth). */
export const PRESELECTED_SERVICE_PARAM = "servizio";

export type ContactFormValues = {
  name: string;
  email: string;
  property: string;
  location: string;
  propertyType: string;
  services: string[];
  budget: string;
  message: string;
  privacyAccepted: boolean;
  /** Honeypot anti-spam: campo nascosto che solo i bot compilano. */
  website: string;
};

export type ContactFormField = keyof ContactFormValues;
/** Campi il cui valore è una stringa: si collegano direttamente a input, textarea e select. */
export type ContactFormTextField = {
  [Field in ContactFormField]: ContactFormValues[Field] extends string ? Field : never;
}[ContactFormField];
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;
export type SubmissionStatus = "idle" | "sending" | "sent" | "error" | "unconfigured";

export const EMPTY_FORM_VALUES: ContactFormValues = {
  name: "",
  email: "",
  property: "",
  location: "",
  propertyType: "",
  services: [],
  budget: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (values.name.trim().length < MIN_NAME_LENGTH) errors.name = "Inserisci il tuo nome.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Inserisci un indirizzo email valido, ad esempio nome@dominio.it.";
  if (!values.property.trim()) errors.property = "Indica il nome della struttura (anche provvisorio).";
  if (!values.location.trim()) errors.location = "Indica dove si trova la struttura.";
  if (!values.propertyType) errors.propertyType = "Seleziona la tipologia di struttura.";
  if (values.services.length === 0) errors.services = "Seleziona almeno un servizio di interesse.";
  if (values.message.trim().length < MIN_MESSAGE_LENGTH) errors.message = `Raccontami qualcosa in più (almeno ${MIN_MESSAGE_LENGTH} caratteri).`;
  if (!values.privacyAccepted) errors.privacyAccepted = "Per inviare la richiesta è necessario confermare di aver letto l'informativa privacy.";
  return errors;
}

/** Corpo della richiesta inviata all'endpoint dei contatti. */
export const toContactPayload = (values: ContactFormValues) => ({
  ...values,
  services: values.services.join(", "),
});

const buildEmailSubject = (propertyName: string) => `Nuovo progetto — ${propertyName}`;

/** Link mailto con la richiesta già compilata: alternativa quando l'invio online non è disponibile. */
export function buildPrefilledMailtoHref(values: ContactFormValues) {
  const summaryLines = [
    `Nome: ${values.name}`,
    `Email: ${values.email}`,
    `Struttura: ${values.property}`,
    `Località: ${values.location}`,
    `Tipologia: ${values.propertyType}`,
    `Servizi: ${values.services.join(", ")}`,
  ];
  if (values.budget) summaryLines.push(`Budget: ${values.budget}`);
  const emailBody = [...summaryLines, "", values.message].join("\n");
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(buildEmailSubject(values.property))}&body=${encodeURIComponent(emailBody)}`;
}
