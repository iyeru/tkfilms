import { useState } from 'react';
import type { Contact as ContactContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';

const FIELD =
  'h-14 border border-white/44 bg-transparent p-3 text-[15px] text-white outline-none placeholder:text-white/50 focus:border-warm';

export function Contact({ contact }: { contact: ContactContent }) {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center bg-bg-alt px-6 py-[110px]"
    >
      <div className="mx-auto w-full max-w-[760px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[clamp(64px,9vw,96px)] leading-none tracking-[1px] uppercase">
            {contact.heading}
          </h2>
        </Reveal>
        <p className="mb-12 text-center text-base text-white/68">{contact.lead}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="grid gap-5"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            <input type="text" placeholder={contact.fields.name} className={FIELD} />
            <input type="email" placeholder={contact.fields.email} className={FIELD} />
          </div>
          <input type="text" placeholder={contact.fields.subject} className={FIELD} />
          <textarea
            placeholder={contact.fields.message}
            className={`${FIELD} h-[150px] resize-y`}
          />
          <button
            type="submit"
            className="w-full border-2 border-warm bg-[linear-gradient(to_top,var(--color-bg)_50%,var(--color-warm)_50%)] bg-[length:100%_200%] bg-[position:0_0] px-[33px] py-[13px] text-[13px] leading-[normal] font-bold tracking-[0.16em] text-bg uppercase transition-[background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-warm"
          >
            {sent ? contact.sentLabel : contact.sendLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
