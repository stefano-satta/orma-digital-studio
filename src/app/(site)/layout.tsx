import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

/** Struttura delle pagine del sito: header, contenuto, footer. La 404 non passa da qui. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main id="contenuto">{children}</main>
      <Footer />
    </>
  );
}
