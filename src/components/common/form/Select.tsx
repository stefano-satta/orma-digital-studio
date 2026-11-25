import type { ComponentProps } from "react";
import { SELECT_CLASS_NAME, getFieldClassName, getInvalidAriaProps } from "./fieldStyles";

type SelectProps = Omit<ComponentProps<"select">, "children"> & {
  options: readonly string[];
  placeholder?: string;
  invalid?: boolean;
};

/** Select a tendina con un'opzione vuota iniziale come segnaposto. */
export function Select({ options, placeholder = "Seleziona…", invalid, className, ...selectProps }: SelectProps) {
  return (
    <select {...selectProps} {...getInvalidAriaProps(invalid)} className={getFieldClassName(invalid, SELECT_CLASS_NAME, className)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
