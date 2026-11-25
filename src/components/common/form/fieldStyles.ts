import { joinClassNames } from "@/lib/joinClassNames";

/** Stile condiviso dei campi testuali (input, textarea, select) su fondo scuro. */
const BASE_FIELD_CLASS_NAME =
  "mt-2 block w-full min-h-12 border-0 border-b bg-transparent px-0 py-2.5 text-[1.05rem] text-paper placeholder:text-paper/35 transition-colors focus:border-sand focus:ring-0 focus:outline-none";

/** Select senza aspetto nativo, con una freccia SVG chiara come sfondo. */
export const SELECT_CLASS_NAME =
  "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20fill=%22none%22%20stroke=%22%23faf9f6%22%20stroke-width=%221.3%22%3E%3Cpath%20d=%22M2%204l4%204%204-4%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_0.25rem_center] bg-no-repeat [&>option]:text-ink";

export const ERROR_TEXT_CLASS_NAME = "text-[#f3b8a3]";

export const getFieldClassName = (invalid: boolean | undefined, ...extraClassNames: (string | undefined)[]) =>
  joinClassNames(BASE_FIELD_CLASS_NAME, invalid ? "border-[#f0a58a]" : "border-paper/30", ...extraClassNames);

/** Attributi ARIA di un campo non valido, così ogni controllo li gestisce allo stesso modo. */
export const getInvalidAriaProps = (invalid: boolean | undefined) => ({
  "aria-invalid": invalid ? true : undefined,
});
