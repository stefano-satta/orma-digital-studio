import type { ReactNode } from "react";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";

export type FormFieldProps = {
  label: ReactNode;
  inputId: string;
  errorId: string;
  error?: string;
  optional?: boolean;
  className?: string;
  /** Il controllo del campo (TextInput, TextArea, Select…). */
  children: ReactNode;
};

/** Composizione standard di un campo: etichetta, controllo e messaggio d'errore. */
export function FormField({ label, inputId, errorId, error, optional, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={inputId} optional={optional}>
        {label}
      </FieldLabel>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
