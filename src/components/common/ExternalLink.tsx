import type { ComponentProps } from "react";

/** Link che apre in una nuova scheda con gli attributi di sicurezza corretti. */
export function ExternalLink(anchorProps: Omit<ComponentProps<"a">, "target" | "rel">) {
  return <a {...anchorProps} target="_blank" rel="noopener noreferrer" />;
}
