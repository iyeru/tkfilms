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
 *
 * 字間は原本がセクションごとに 1px / 2px を打ち分けているのでそのまま引き継ぐ。
 * reveal を false にすると、画面に入ってから現れる動きを外す（原本で
 * data-anim が付いていない見出しがこれにあたる）。
 */
export function SectionHeading({
  title,
  tracking = '1px',
  reveal = true,
}: {
  title: string;
  tracking?: '1px' | '2px';
  reveal?: boolean;
}) {
  const heading = (
    <h2
      className={cn(
        'font-display text-[clamp(64px,9vw,96px)] leading-none uppercase',
        tracking === '2px' ? 'tracking-[2px]' : 'tracking-[1px]',
      )}
    >
      {title}
    </h2>
  );

  return reveal ? (
    <Reveal className="text-center">{heading}</Reveal>
  ) : (
    <div className="text-center">{heading}</div>
  );
}
