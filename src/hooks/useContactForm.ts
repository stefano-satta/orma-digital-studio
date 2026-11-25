"use client";

import { useCallback, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import {
  EMPTY_FORM_VALUES,
  toContactPayload,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormField,
  type ContactFormTextField,
  type ContactFormValues,
  type SubmissionStatus,
} from "@/models/contactFormModel";

type TextControlChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

/** Stato, validazione e invio del modulo contatti, separati dalla loro presentazione. */
export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const formId = useId();
  /** id del messaggio di esito (conferma o avviso), che riceve il focus dopo l'invio. */
  const statusMessageId = `${formId}-status`;

  const updateField = <Field extends ContactFormField>(field: Field, value: ContactFormValues[Field]) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    if (errors[field]) setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const toggleService = (serviceTitle: string) => {
    const isSelected = values.services.includes(serviceTitle);
    updateField(
      "services",
      isSelected
        ? values.services.filter((selectedTitle) => selectedTitle !== serviceTitle)
        : [...values.services, serviceTitle],
    );
  };

  const preselectService = useCallback((serviceId: string) => {
    const preselectedService = services.find((service) => service.id === serviceId);
    if (!preselectedService) return;
    setValues((currentValues) =>
      currentValues.services.includes(preselectedService.title)
        ? currentValues
        : { ...currentValues, services: [...currentValues.services, preselectedService.title] },
    );
  }, []);

  const inputId = (field: ContactFormField) => `${formId}-${field}`;
  const errorId = (field: ContactFormField) => `${formId}-${field}-error`;

  /** Props per FormField: id del controllo, id e testo dell'errore. */
  const getFieldMeta = (field: ContactFormField) => ({
    inputId: inputId(field),
    errorId: errorId(field),
    error: errors[field],
  });

  /** Props comuni a ogni controllo: id, name, aggancio per il focus e collegamento al messaggio d'errore. */
  const getControlProps = (field: ContactFormField) => ({
    id: inputId(field),
    name: field,
    "data-field": field,
    invalid: Boolean(errors[field]),
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });

  /** Collega un controllo testuale (input, textarea, select) al valore del campo. */
  const bindTextField = (field: ContactFormTextField) => ({
    ...getControlProps(field),
    value: values[field],
    onChange: (event: TextControlChangeEvent) => updateField(field, event.target.value),
  });

  const focusStatusMessage = () => requestAnimationFrame(() => document.getElementById(statusMessageId)?.focus());

  const focusFirstInvalidField = (formElement: HTMLFormElement, validationErrors: ContactFormErrors) => {
    const firstInvalidField = Object.keys(validationErrors)[0];
    if (!firstInvalidField) return false;
    formElement.querySelector<HTMLElement>(`[data-field="${firstInvalidField}"]`)?.focus();
    return true;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    if (focusFirstInvalidField(event.currentTarget, validationErrors)) return;
    const isLikelyBot = values.website !== "";
    if (isLikelyBot) return;

    setStatus("sending");
    try {
      const response = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(toContactPayload(values)),
      });
      if (response.status === 503) {
        // Backend non ancora configurato: niente invio simulato, offriamo canali reali.
        setStatus("unconfigured");
        focusStatusMessage();
        return;
      }
      if (!response.ok) throw new Error(`Invio fallito con stato HTTP ${response.status}`);
      setStatus("sent");
      setValues(EMPTY_FORM_VALUES);
    } catch {
      setStatus("error");
    }
    focusStatusMessage();
  }

  return {
    formId,
    values,
    errors,
    status,
    statusMessageId,
    updateField,
    toggleService,
    preselectService,
    getFieldMeta,
    getControlProps,
    bindTextField,
    handleSubmit,
  };
}

export type ContactFormController = ReturnType<typeof useContactForm>;
