import type { Service as ServiceContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';

export function Service({ service }: { service: ServiceContent }) {
  return (
    <Section id="service">
      <SectionHeading title={service.heading} lead={service.lead} />

      {/* プラン */}
      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:gap-[26px]">
        {service.plans.map((plan) => (
          <Reveal key={plan.tag} className="border border-line p-[30px]">
            <p className="mb-2.5 text-xs font-bold tracking-[0.22em] text-accent uppercase">
              {plan.tag}
            </p>
            <h3 className="mb-1.5 font-display text-[38px] leading-none tracking-[1px] uppercase">
              {plan.title}
            </h3>
            <p className="mb-5 text-[15px] leading-[1.8] text-white/70">{plan.desc}</p>
            <p className="font-slim text-[36px] leading-[1.2] font-thin">
              {plan.price}
              {plan.unit && <small className="ml-1.5 font-sans text-[13px] text-white/40">{plan.unit}</small>}
            </p>
          </Reveal>
        ))}
      </div>

      {/* 撮影の流れ */}
      <div className="mt-16 grid grid-cols-1 gap-[34px] text-center md:grid-cols-3 md:gap-10">
        {service.flow.map((step) => (
          <Reveal key={step.no}>
            <div className="font-display text-[52px] leading-none text-accent">{step.no}</div>
            <h3 className="mt-2.5 mb-2 text-[15px] font-bold tracking-[0.14em] uppercase">
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.85] text-white/60">{step.text}</p>
          </Reveal>
        ))}
      </div>

      {/* 補足 */}
      {service.notes.length > 0 && (
        <Reveal as="ul" className="mx-auto mt-14 grid max-w-[720px] gap-3.5">
          {service.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-3 text-left leading-[1.8] text-white/78">
              <span aria-hidden className="flex-none font-bold text-accent">
                ✓
              </span>
              {note}
            </li>
          ))}
        </Reveal>
      )}
    </Section>
  );
}
