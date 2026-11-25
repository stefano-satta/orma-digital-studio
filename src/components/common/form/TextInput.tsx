import type { ComponentProps } from "react";
import { getFieldClassName, getInvalidAriaProps } from "./fieldStyles";

type TextInputProps = ComponentProps<"input"> & { invalid?: boolean };

export function TextInput({ invalid, className, ...inputProps }: TextInputProps) {
  return <input {...inputProps} {...getInvalidAriaProps(invalid)} className={getFieldClassName(invalid, className)} />;
}
