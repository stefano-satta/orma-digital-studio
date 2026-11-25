import type { ComponentProps } from "react";

/** Campo trappola anti-spam: invisibile agli utenti, lo compilano solo i bot. */
export function HoneypotField(inputProps: Omit<ComponentProps<"input">, "tabIndex" | "autoComplete">) {
  return (
    <div className="hidden" aria-hidden="true">
      <label>
        Lascia vuoto
        <input {...inputProps} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
