import type { ComponentProps, ReactNode } from "react";
import { getInvalidAriaProps } from "./fieldStyles";

type CheckboxProps = Omit<ComponentProps<"input">, "type" | "children"> & {
  children: ReactNode;
  invalid?: boolean;
};

/** Casella di spunta classica con testo descrittivo cliccabile (es. consenso privacy). */
export function Checkbox({ children, invalid, className, ...inputProps }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer gap-4 text-[0.95rem] leading-relaxed text-paper/80">
      <input
        type="checkbox"
        {...inputProps}
        {...getInvalidAriaProps(invalid)}
        className={className ?? "mt-1 size-5 shrink-0 accent-terracotta"}
      />
      <span>{children}</span>
    </label>
  );
}
