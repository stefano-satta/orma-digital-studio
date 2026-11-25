import type { ComponentProps } from "react";
import { getFieldClassName, getInvalidAriaProps } from "./fieldStyles";

type TextAreaProps = ComponentProps<"textarea"> & { invalid?: boolean };

export function TextArea({ invalid, className, rows = 5, ...textAreaProps }: TextAreaProps) {
  return (
    <textarea
      {...textAreaProps}
      {...getInvalidAriaProps(invalid)}
      rows={rows}
      className={getFieldClassName(invalid, "resize-y", className)}
    />
  );
}
