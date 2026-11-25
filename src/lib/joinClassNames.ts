type ConditionalClassName = string | false | null | undefined;

/** Unisce classi condizionali (scartando i valori falsy) senza dipendenze esterne. */
export function joinClassNames(...classNames: ConditionalClassName[]) {
  return classNames.filter(Boolean).join(" ");
}
