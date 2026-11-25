import { ArrowRight, Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { joinClassNames } from "@/lib/joinClassNames";

type SubmitButtonProps = Omit<ComponentProps<"button">, "type" | "children"> & {
  children: ReactNode;
  isLoading?: boolean;
  loadingLabel?: ReactNode;
};

/** Pulsante d'invio chiaro con freccia; durante l'invio mostra uno spinner e si disabilita. */
export function SubmitButton({ children, isLoading = false, loadingLabel = "Invio in corso…", disabled, className, ...buttonProps }: SubmitButtonProps) {
  return (
    <button
      {...buttonProps}
      type="submit"
      disabled={disabled || isLoading}
      className={joinClassNames(
        "group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-paper px-8 font-medium text-ink transition-colors hover:bg-sand disabled:opacity-60",
        className,
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          {loadingLabel}
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
        </>
      )}
    </button>
  );
}
