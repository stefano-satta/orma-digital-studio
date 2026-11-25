import { Check } from "lucide-react";
import type { ComponentProps } from "react";
import { joinClassNames } from "@/lib/joinClassNames";

type ChoiceChipProps = Omit<ComponentProps<"input">, "type" | "className" | "children"> & {
  label: string;
  /** Testo secondario, mostrato più piccolo dopo l'etichetta. */
  hint?: string;
};

/** Casella di spunta a forma di "pillola": la checkbox nativa è nascosta ma resta accessibile. */
export function ChoiceChip({ label, hint, checked, ...inputProps }: ChoiceChipProps) {
  return (
    <label
      className={joinClassNames(
        "inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border px-5 text-[0.95rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta",
        checked ? "border-sand bg-sand text-ink" : "border-paper/30 hover:border-paper/70",
      )}
    >
      <input {...inputProps} type="checkbox" className="sr-only" checked={checked} />
      {checked && <Check className="size-4" aria-hidden="true" />}
      {label}
      {hint && <span className="text-[0.8rem] opacity-70">· {hint}</span>}
    </label>
  );
}
