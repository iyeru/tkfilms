import type { Contact as ContactContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { externalLinkProps } from '@/lib/cn';

export function Contact({ contact }: { contact: ContactContent }) {
  return (
    <Section id="contact">
      <SectionHeading title={contact.heading} lead={contact.lead} />

      <Reveal className="mx-auto grid max-w-[520px] grid-cols-1 gap-4 md:grid-cols-2">
        {contact.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...externalLinkProps(link.href)}
            className="block border-2 border-accent bg-[linear-gradient(to_top,var(--color-accent)_50%,transparent_50%)] bg-[length:100%_200%] bg-[position:0_0] px-[30px] py-[17px] text-center text-sm font-bold tracking-[0.12em] text-white uppercase transition-[background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-bg"
          >
            {link.label}
          </a>
        ))}
      </Reveal>

      {contact.note && (
        <p className="mt-[26px] text-center text-[13px] text-white/40">{contact.note}</p>
      )}
    </Section>
  );
}
