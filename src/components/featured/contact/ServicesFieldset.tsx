import { services } from "@/content/services";
import { ChoiceChip } from "@/components/common/form/ChoiceChip";
import { FieldError } from "@/components/common/form/FieldError";
import { FieldLabel } from "@/components/common/form/FieldLabel";

type ServicesFieldsetProps = {
  selectedServices: string[];
  onToggle: (serviceTitle: string) => void;
  errorId: string;
  error?: string;
  className?: string;
};

/** Gruppo di scelte multiple con i servizi offerti. */
export function ServicesFieldset({ selectedServices, onToggle, errorId, error, className }: ServicesFieldsetProps) {
  return (
    <fieldset className={className} aria-describedby={error ? errorId : undefined}>
      <FieldLabel as="legend">Servizi di interesse</FieldLabel>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {services.map((service, serviceIndex) => (
          <ChoiceChip
            key={service.id}
            name="services"
            value={service.title}
            label={service.title}
            hint={service.subtitle}
            checked={selectedServices.includes(service.title)}
            onChange={() => onToggle(service.title)}
            // Solo la prima casella riceve il focus in caso di errore sul gruppo.
            data-field={serviceIndex === 0 ? "services" : undefined}
          />
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
