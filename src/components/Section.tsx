import type { ReactNode } from 'react';
import type { SectionId } from '@/content.types';
import { Reveal } from './Reveal';

/**
 * Hero 以外のセクションの外枠。
 * 背景色は index.css の nth-of-type で交互に切り替わるのでここでは指定しない。
 */
export function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-14 px-pad py-24 md:py-[110px]">
      <div className="mx-auto w-full max-w-[1140px]">{children}</div>
    </section>
  );
}

/** 英字の大見出し＋アクセントの罫＋リード文 */
export function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <>
      <Reveal className="text-center">
        <h2 className="font-display text-[clamp(58px,14vw,96px)] leading-none tracking-[1px] uppercase">
          {title}
        </h2>
      </Reveal>
      <Rule className="mt-[26px] mb-8" />
      {lead && (
        <Reveal
          as="p"
          className="mx-auto mb-12 max-w-[620px] text-center text-pretty text-white/70"
        >
          {lead}
        </Reveal>
      )}
    </>
  );
}

/** 見出し下のアクセントの罫 */
export function Rule({ className }: { className?: string }) {
  return <div className={`mx-auto h-[5px] w-10 bg-accent ${className ?? ''}`} />;
}
