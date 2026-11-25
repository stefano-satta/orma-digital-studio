import { getServicePage } from "@/content/servicePages";
import { ServicePage } from "@/components/featured/service-page/ServicePage";
import { serviceMetadata } from "@/components/featured/service-page/serviceSeo";

const servicePage = getServicePage("siti-web-strutture-ricettive");

export const metadata = serviceMetadata(servicePage);

export default function Page() {
  return <ServicePage servicePage={servicePage} />;
}
