"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav, site, whatsappUrl } from "@/content/site";
import { Logo } from "@/components/common/Logo";
import { ExternalLink } from "@/components/common/ExternalLink";
import { ormaEase } from "@/components/common/motion/primitives";
import { joinClassNames } from "@/lib/joinClassNames";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/smoothScroll";

/** Scroll (px) oltre il quale l'header diventa opaco. */
const SCROLL_THRESHOLD = 40;

const mobileMenuItems = [...nav, { label: "Contatti", href: "/#contatti" }];

export function Header() {
  const pathname = usePathname();
  const pageStartsWithHeroImage = pathname === "/" || pathname.startsWith("/portfolio/") || pathname.startsWith("/servizi/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  // Menu mobile: blocco scroll, Escape, focus intrappolato nel pannello e ritorno al pulsante.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menuToggle = menuToggleRef.current;
    menuPanelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
      if (event.key === "Tab" && menuPanelRef.current) {
        const panelLinks = [...menuPanelRef.current.querySelectorAll<HTMLElement>("a")];
        const focusableElements = menuToggle ? [menuToggle, ...panelLinks] : panelLinks;
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuToggle?.focus();
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  /** In home, un clic normale (senza modificatori che aprono nuove schede) lo gestiamo noi invece di Next. */
  const shouldHandleInPage = (event: React.MouseEvent<HTMLAnchorElement>) =>
    pathname === "/" && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

  // Logo cliccato già in home: niente navigazione di Next (con lo stesso URL non scorre, e togliendo
  // un'ancora come #servizi resterebbe a metà pagina). Si ripulisce l'URL e si torna in cima con
  // lo scroll morbido; se si è già in cima la pagina resta ferma.
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (!shouldHandleInPage(event)) return;
    event.preventDefault();
    if (window.location.hash) window.history.replaceState(window.history.state, "", "/");
    // Al frame successivo: il menu mobile appena chiuso ha già ripristinato lo scroll del body.
    requestAnimationFrame(smoothScrollToTop);
  };

  // Link a una sezione ("/#servizi") cliccato in home: scroll morbido invece del salto nativo.
  // Da altre pagine resta la navigazione di Next verso la home con l'ancora.
  const handleSectionLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    const sectionId = href.split("#")[1];
    if (!sectionId || !shouldHandleInPage(event) || !document.getElementById(sectionId)) return;
    event.preventDefault();
    window.history.pushState(window.history.state, "", href);
    requestAnimationFrame(() => smoothScrollToId(sectionId));
  };
  // Testo chiaro quando l'header è trasparente sopra la foto, oppure sopra il menu mobile scuro.
  const isTransparentOverImage = pageStartsWithHeroImage && !isScrolled && !isMenuOpen;
  const useLightText = isTransparentOverImage || isMenuOpen;

  return (
    <>
      <a
        href="#contenuto"
        className="sr-only z-[60] rounded-full bg-paper px-5 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Vai al contenuto
      </a>

      <header
        className={joinClassNames(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-500",
          useLightText ? "text-paper" : "text-ink",
          isScrolled && !isMenuOpen && "bg-ivory/85 shadow-[0_1px_0_rgb(36_36_33/0.08)] backdrop-blur-md",
        )}
      >
        <div className="shell flex h-18 items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label="ORMA, torna alla home" className="relative z-10 text-[1.6rem] md:text-[1.75rem]" onClick={handleLogoClick}>
            <Logo />
          </Link>

          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.92rem]">
              {nav.map((navItem) => (
                <li key={navItem.href}>
                  <Link href={navItem.href} className="link-draw py-2" onClick={(event) => handleSectionLinkClick(event, navItem.href)}>
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <Link
              href="/#contatti"
              onClick={(event) => handleSectionLinkClick(event, "/#contatti")}
              className={joinClassNames(
                "hidden min-h-11 items-center rounded-full border px-5 text-[0.9rem] font-medium transition-colors duration-300 sm:inline-flex",
                useLightText ? "border-paper/45 hover:bg-paper hover:text-ink" : "border-ink/25 hover:bg-ink hover:text-paper",
              )}
            >
              Parliamo del tuo progetto
            </Link>
            <button
              ref={menuToggleRef}
              type="button"
              className="inline-flex size-12 items-center justify-center lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="menu-mobile"
              aria-label={isMenuOpen ? "Chiudi il menu" : "Apri il menu"}
              onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
            >
              {/* Due linee che ruotano formando una X */}
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span className={joinClassNames("absolute left-0 h-px w-full bg-current transition-transform duration-500", isMenuOpen ? "top-1.5 rotate-45" : "top-0")} />
                <span className={joinClassNames("absolute left-0 h-px w-full bg-current transition-transform duration-500", isMenuOpen ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="menu-mobile"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="grain fixed inset-0 z-40 flex flex-col bg-forest-deep text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: ormaEase }}
          >
            <nav aria-label="Menu mobile" className="shell flex flex-1 flex-col justify-center pt-20">
              <ul className="space-y-1">
                {mobileMenuItems.map((menuItem, menuItemIndex) => (
                  <motion.li
                    key={menuItem.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + menuItemIndex * 0.05, duration: 0.7, ease: ormaEase }}
                  >
                    <Link
                      href={menuItem.href}
                      onClick={(event) => handleSectionLinkClick(event, menuItem.href)}
                      className="flex items-baseline gap-4 py-1.5 font-serif text-[clamp(2.4rem,11vw,4rem)] leading-none"
                    >
                      <span className="font-sans text-xs tabular-nums text-paper/50">{String(menuItemIndex + 1).padStart(2, "0")}</span>
                      {menuItem.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="shell flex flex-wrap gap-x-6 gap-y-2 pb-10 text-sm text-paper/70">
              <a href={`mailto:${site.contact.email}`} className="py-2">{site.contact.email}</a>
              {site.contact.whatsapp && <ExternalLink href={whatsappUrl()} className="py-2">WhatsApp</ExternalLink>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
