import Link from "next/link";
import { nav, site, whatsappUrl } from "@/content/site";
import { servicePagePath, servicePages } from "@/content/servicePages";
import { OrmaMark } from "@/components/common/Logo";
import { Year } from "@/components/common/Year";
import { ExternalLink } from "@/components/common/ExternalLink";

export function Footer() {
  const socialLinks = [
    { label: "Instagram", href: site.social.instagram },
    { label: "LinkedIn", href: site.social.linkedin },
  ].filter((socialLink) => socialLink.href);

  return (
    <footer className="grain overflow-hidden bg-forest-deep text-paper">
      <div className="shell grid gap-12 pt-20 pb-10 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-4">
          <p className="max-w-sm font-serif text-[1.9rem] leading-[1.1]">
            Siti web, fotografia e video per l&apos;ospitalità indipendente.
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/65">
            {site.tagline}. Dalla Sardegna, per strutture che hanno qualcosa di speciale da raccontare.
          </p>
        </div>

        <nav aria-label="Servizi" className="md:col-span-3 md:col-start-5">
          <p className="eyebrow mb-5 text-paper/50">Servizi</p>
          <ul className="text-[0.95rem]">
            {servicePages.map((servicePage) => (
              <li key={servicePage.slug}>
                <Link href={servicePagePath(servicePage)} className="link-draw inline-block py-1.5">
                  {servicePage.linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="eyebrow mb-5 text-paper/50">Indice</p>
          <ul className="grid grid-cols-2 gap-x-6 text-[0.95rem] md:grid-cols-1">
            {nav.map((navItem) => (
              <li key={navItem.href}>
                <Link href={navItem.href} className="link-draw inline-block py-1.5">
                  {navItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-5 text-paper/50">Contatti</p>
          <ul className="text-[0.95rem]">
            <li>
              <a href={`mailto:${site.contact.email}`} className="link-draw inline-block py-1.5">
                {site.contact.email}
              </a>
            </li>
            {site.contact.whatsapp && (
              <li>
                <ExternalLink href={whatsappUrl()} className="link-draw inline-block py-1.5">
                  WhatsApp
                </ExternalLink>
              </li>
            )}
            {socialLinks.map((socialLink) => (
              <li key={socialLink.label}>
                <ExternalLink href={socialLink.href} className="link-draw inline-block py-1.5">
                  {socialLink.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wordmark monumentale, tagliato dal bordo inferiore */}
      <div className="shell select-none" aria-hidden="true">
        <div className="flex items-end gap-[0.04em] font-serif text-[min(30vw,26rem)] leading-[0.74] tracking-[0.06em] text-paper/[0.08] translate-y-[0.14em]">
          <OrmaMark className="h-[0.72em] w-auto shrink-0 self-center translate-y-[0.06em]" />
          <span>RMA</span>
        </div>
      </div>

      <div className="relative border-t border-paper/12 bg-forest-deep">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year /> {site.name} · {site.descriptor} · {site.region}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-draw py-2">Privacy policy</Link>
            <Link href="#top" className="link-draw py-2">Torna su ↑</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
