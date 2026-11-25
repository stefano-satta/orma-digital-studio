import { SectionLabel } from "@/components/common/SectionLabel";
import { ContactDetails } from "@/components/featured/contact/ContactDetails";
import { ContactFormPanel } from "@/components/featured/contact/ContactFormPanel";

export function Contact() {
  return (
    <section id="contatti" aria-labelledby="contatti-title" className="grain section-y bg-forest text-paper">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionLabel sectionNumber="11" tone="light">Contatti</SectionLabel>
          <h2 id="contatti-title" className="mt-10 font-serif text-h2">
            Parliamo del <em className="serif-italic text-sand">tuo progetto.</em>
          </h2>
          <p className="mt-6 max-w-sm text-paper/75 leading-relaxed">
            Compila il modulo o scrivimi direttamente. La prima conversazione è gratuita e senza impegno.
          </p>
          <ContactDetails />
        </div>

        <ContactFormPanel className="lg:col-span-7 lg:col-start-6" />
      </div>
    </section>
  );
}
