import type { ReactNode } from "react";

type FieldLabelProps = {
  children: ReactNode;
  /** id del controllo associato (solo per `as="label"`). */
  htmlFor?: string;
  optional?: boolean;
  /** "legend" per i gruppi di controlli dentro un fieldset. */
  as?: "label" | "legend";
};

/** Etichetta di un campo, con asterisco per i campi obbligatori o la nota "(facoltativo)". */
export function FieldLabel({ children, htmlFor, optional = false, as: Tag = "label" }: FieldLabelProps) {
  return (
    <Tag htmlFor={Tag === "label" ? htmlFor : undefined} className="eyebrow text-paper/65">
      {children}
      {optional ? (
        <span className="ml-2 normal-case tracking-normal text-paper/45">(facoltativo)</span>
      ) : (
        <span aria-hidden="true"> *</span>
      )}
    </Tag>
  );
}
