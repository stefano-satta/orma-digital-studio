import type { ReactNode } from "react";
import { joinClassNames } from "@/lib/joinClassNames";

/** Etichetta editoriale: numero di sezione + nome, separati da un filetto. */
export function SectionLabel({
  sectionNumber,
  children,
  className,
  tone = "dark",
}: {
  sectionNumber: string;
  children: ReactNode;
  className?: string;
  /** "dark" = testo scuro su fondo chiaro; "light" = testo chiaro su fondo scuro. */
  tone?: "dark" | "light";
}) {
  const isDarkTone = tone === "dark";
  return (
    <p className={joinClassNames("eyebrow flex items-center gap-4", isDarkTone ? "text-ink-soft" : "text-paper/70", className)}>
      <span className="tabular-nums">{sectionNumber}</span>
      <span className={joinClassNames("h-px w-10", isDarkTone ? "bg-ink/25" : "bg-paper/35")} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
