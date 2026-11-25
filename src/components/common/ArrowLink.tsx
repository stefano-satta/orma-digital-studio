import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { joinClassNames } from "@/lib/joinClassNames";

type ArrowLinkVariant = "solid" | "light" | "outline" | "text";

const variantClassNames: Record<ArrowLinkVariant, string> = {
  solid: "bg-forest text-paper hover:bg-ink",
  light: "bg-paper text-ink hover:bg-sand",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  text: "px-0! min-h-0! rounded-none!",
};

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  variant?: ArrowLinkVariant;
  /** Apre in una nuova scheda e mostra la freccia diagonale. */
  external?: boolean;
};

const arrowClassName = "absolute size-4 transition-transform duration-500 ease-(--ease-orma)";

/** Pulsante/link con freccia che scorre all'hover. Target minimo 48px. */
export function ArrowLink({ children, variant = "solid", external, className, ...linkProps }: ArrowLinkProps) {
  const ArrowIcon = external ? ArrowUpRight : ArrowRight;
  const externalLinkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      {...linkProps}
      {...externalLinkProps}
      className={joinClassNames(
        "group inline-flex min-h-12 items-center gap-3 rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-300",
        variantClassNames[variant],
        className,
      )}
    >
      <span className={variant === "text" ? "link-draw pb-0.5" : undefined}>{children}</span>
      {/* Due frecce: quella visibile esce a destra, la seconda entra da sinistra. */}
      <span className="relative inline-flex size-4 overflow-hidden" aria-hidden="true">
        <ArrowIcon className={joinClassNames(arrowClassName, "group-hover:translate-x-5")} strokeWidth={1.6} />
        <ArrowIcon className={joinClassNames(arrowClassName, "-translate-x-5 group-hover:translate-x-0")} strokeWidth={1.6} />
      </span>
    </Link>
  );
}
