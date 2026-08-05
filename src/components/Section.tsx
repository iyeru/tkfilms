import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { cn } from '@/lib/cn';

/**
 * Hero 以外のセクションの外枠。
 * 背景は交互ではなく明示で持つ。セクションの追加・削除で並び順が変わっても
 * 位置に依存しない指定にするため。
 */
export function Section({
  id,
  tone = 'base',
  className,
  children,
}: {
  id?: string;
  tone?: 'base' | 'alt';
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn('px-6 py-[110px]', tone === 'alt' ? 'bg-bg-alt' : 'bg-bg', className)}
    >
      <div className="mx-auto w-full max-w-[1140px]">{children}</div>
    </section>
  );
}

/**
 * 英字の大見出し。
 * 以前は見出しごとにアクセントの罫を敷いていたが、同じ装飾が全セクションに
 * 並ぶだけで何も語っていなかったため落としている。
 */
export function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <>
      <Reveal className="text-center">
        <h2 className="font-display text-[clamp(64px,9vw,96px)] leading-none tracking-[1px] uppercase">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal as="p" className="mx-auto mb-14 max-w-[620px] text-center text-base text-pretty text-white/70">
          {lead}
        </Reveal>
      )}
    </>
  );
}
