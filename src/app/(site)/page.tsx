import { Hero } from "@/components/featured/sections/Hero";
import { Manifesto } from "@/components/featured/sections/Manifesto";
import { Challenge } from "@/components/featured/sections/Challenge";
import { Services } from "@/components/featured/sections/Services";
import { WhyWebsite } from "@/components/featured/sections/WhyWebsite";
import { Process } from "@/components/featured/sections/Process";
import { HospitalityTypes } from "@/components/featured/sections/HospitalityTypes";
import { Sardinia } from "@/components/featured/sections/Sardinia";
import { About } from "@/components/featured/sections/About";
import { Faq } from "@/components/featured/sections/Faq";
import { FinalCta } from "@/components/featured/sections/FinalCta";
import { Contact } from "@/components/featured/sections/Contact";
import { JsonLd, homeGraph } from "@/components/common/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Hero />
      <Manifesto />
      <Challenge />
      <Services />
      {/* Sezione Portfolio (components/featured/Portfolio.tsx) nascosta: per riattivarla importala qui e rimetti "Progetti" in nav (content/site.ts). */}
      <WhyWebsite />
      <Process />
      <HospitalityTypes />
      <Sardinia />
      <About />
      <Faq />
      <FinalCta />
      <Contact />
    </>
  );
}
