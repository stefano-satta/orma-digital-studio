import Link from "next/link";
import { joinClassNames } from "@/lib/joinClassNames";
import { Checkbox } from "@/components/common/form/Checkbox";
import { FieldError } from "@/components/common/form/FieldError";
import { FormField } from "@/components/common/form/FormField";
import { HoneypotField } from "@/components/common/form/HoneypotField";
import { Select } from "@/components/common/form/Select";
import { SubmitButton } from "@/components/common/form/SubmitButton";
import { TextArea } from "@/components/common/form/TextArea";
import { TextInput } from "@/components/common/form/TextInput";
import { BUDGET_RANGES, PROPERTY_TYPES, buildPrefilledMailtoHref } from "@/models/contactFormModel";
import { ServicesFieldset } from "./ServicesFieldset";
import { SubmissionFallback } from "./SubmissionFallback";
import type { ContactFormController } from "@/hooks/useContactForm";

const FULL_WIDTH = "sm:col-span-2";

/** Layout del modulo contatti: riceve stato e azioni da useContactForm. */
export function ContactForm({ form }: { form: ContactFormController }) {
  const { formId, values, errors, status, statusMessageId, updateField, toggleService, getFieldMeta, getControlProps, bindTextField, handleSubmit } = form;
  const requiredFieldsNoteId = `${formId}-required-note`;
  const privacyMeta = getFieldMeta("privacyAccepted");

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-x-8 gap-y-9 sm:grid-cols-2" aria-describedby={requiredFieldsNoteId}>
      <p id={requiredFieldsNoteId} className={joinClassNames("text-sm text-paper/55", FULL_WIDTH)}>I campi contrassegnati con * sono obbligatori.</p>

      <FormField label="Nome" {...getFieldMeta("name")}>
        <TextInput {...bindTextField("name")} autoComplete="name" required />
      </FormField>
      <FormField label="Email" {...getFieldMeta("email")}>
        <TextInput {...bindTextField("email")} type="email" autoComplete="email" inputMode="email" required />
      </FormField>
      <FormField label="Nome della struttura" {...getFieldMeta("property")}>
        <TextInput {...bindTextField("property")} autoComplete="organization" required />
      </FormField>
      <FormField label="Località" {...getFieldMeta("location")}>
        <TextInput {...bindTextField("location")} autoComplete="address-level2" placeholder="es. San Teodoro" required />
      </FormField>
      <FormField label="Tipologia" {...getFieldMeta("propertyType")}>
        <Select {...bindTextField("propertyType")} options={PROPERTY_TYPES} required />
      </FormField>
      <FormField label="Budget indicativo" optional {...getFieldMeta("budget")}>
        <Select {...bindTextField("budget")} options={BUDGET_RANGES} />
      </FormField>

      <ServicesFieldset
        className={FULL_WIDTH}
        selectedServices={values.services}
        onToggle={toggleService}
        errorId={getFieldMeta("services").errorId}
        error={errors.services}
      />

      <FormField label="Raccontami il progetto" className={FULL_WIDTH} {...getFieldMeta("message")}>
        <TextArea {...bindTextField("message")} placeholder="La struttura, cosa vorresti migliorare, eventuali tempi…" required />
      </FormField>

      <HoneypotField value={values.website} onChange={(event) => updateField("website", event.target.value)} />

      <div className={FULL_WIDTH}>
        <Checkbox
          {...getControlProps("privacyAccepted")}
          checked={values.privacyAccepted}
          onChange={(event) => updateField("privacyAccepted", event.target.checked)}
        >
          Ho letto l&apos;<Link href="/privacy" className="underline underline-offset-4">informativa privacy</Link>: i miei dati verranno usati solo per rispondere a questa richiesta. <span aria-hidden="true">*</span>
        </Checkbox>
        <FieldError id={privacyMeta.errorId} message={privacyMeta.error} />
      </div>

      <div className={joinClassNames("flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between", FULL_WIDTH)}>
        <SubmitButton isLoading={status === "sending"}>Invia la richiesta</SubmitButton>
        <p className="text-sm text-paper/55">Rispondo personalmente a ogni richiesta.</p>
      </div>

      {(status === "error" || status === "unconfigured") && (
        <SubmissionFallback id={statusMessageId} reason={status} mailtoHref={buildPrefilledMailtoHref(values)} className={FULL_WIDTH} />
      )}
    </form>
  );
}
