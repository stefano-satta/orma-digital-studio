import type { ReactNode } from "react";
import { site, whatsappUrl } from "@/content/site";
import { ExternalLink } from "@/components/common/ExternalLink";
import { joinClassNames } from "@/lib/joinClassNames";

function ContactDetail({ term, children, className }: { term: string; children: ReactNode; className?: string }) {
  return (
    <div>
      <dt className="eyebrow text-paper/50">{term}</dt>
      <dd className={joinClassNames("mt-1.5", className)}>{children}</dd>
    </div>
  );
}

/** Canali di contatto diretti mostrati accanto al modulo. */
export function ContactDetails() {
  const hasSocialProfiles = Boolean(site.social.instagram || site.social.linkedin);
  return (
    <dl className="mt-12 space-y-6 text-[0.98rem]">
      <ContactDetail term="Email">
        <a className="link-draw" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </ContactDetail>

      {site.contact.whatsapp && (
        <ContactDetail term="WhatsApp">
          <ExternalLink className="link-draw" href={whatsappUrl()}>{site.contact.whatsappLabel}</ExternalLink>
        </ContactDetail>
      )}
      {hasSocialProfiles && (
        <ContactDetail term="Social" className="flex gap-5">
          {site.social.instagram && <ExternalLink className="link-draw" href={site.social.instagram}>Instagram</ExternalLink>}
          {site.social.linkedin && <ExternalLink className="link-draw" href={site.social.linkedin}>LinkedIn</ExternalLink>}
        </ContactDetail>
      )}

      <ContactDetail term="Area" className="text-paper/80">
        Tutta la Sardegna · progetti web in tutta Italia
      </ContactDetail>
    </dl>
  );
}
