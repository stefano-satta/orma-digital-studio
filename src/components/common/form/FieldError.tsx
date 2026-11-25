import { ERROR_TEXT_CLASS_NAME } from "./fieldStyles";
import { joinClassNames } from "@/lib/joinClassNames";

/** Messaggio d'errore di un campo; non renderizza nulla se non c'è errore. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={joinClassNames("mt-2 text-sm", ERROR_TEXT_CLASS_NAME)}>
      {message}
    </p>
  );
}
