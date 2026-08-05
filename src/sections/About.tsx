import type { AboutBlock, About as AboutContent } from '@/content.types';
import { cn } from '@/lib/cn';

/**
 * 人物を上から順に並べる全幅のセクション。
 * 経歴と顔写真を左右で埋め、写真の側は1ブロックごとに入れ替わる。
 */
export function About({ about }: { about: AboutContent }) {
  return (
    <section id="about" className="flex min-h-screen flex-col bg-bg px-6 pt-[110px]">
      <h2 className="mb-12 text-center font-display text-[clamp(56px,7vw,96px)] leading-none tracking-[1px] uppercase">
        {about.heading}
      </h2>

      {about.blocks.map((block, i) => (
        <Person key={block.portrait} block={block} first={i === 0} portraitLeft={i % 2 === 1} />
      ))}
    </section>
  );
}

function Person({
  block,
  first,
  portraitLeft,
}: {
  block: AboutBlock;
  first: boolean;
  portraitLeft: boolean;
}) {
  const portrait = (
    <div
      className="min-h-[60vh] min-w-[min(100%,360px)] flex-1 basis-[420px] bg-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${block.portrait})` }}
    />
  );

  const text = (
    <div
      className={cn(
        'flex min-w-[min(100%,420px)] flex-1 basis-[520px] flex-col justify-center',
        'px-[clamp(40px,6vw,64px)] pb-[clamp(40px,6vw,64px)]',
        // 先頭は見出しが余白を作っているので上を詰める
        first ? 'pt-0' : 'pt-[clamp(40px,6vw,64px)]',
      )}
    >
      <div>
        {block.body.map((paragraph, i) => (
          <p key={i} className="mb-6 text-base text-pretty text-white/70 last:mb-8">
            {paragraph}
          </p>
        ))}
      </div>

      {/* 行間は原本と同じく親に持たせる。ラベルは倍率を継いだうえで字だけ小さくする */}
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-7 gap-y-5 text-sm leading-[1.7] text-white/70">
        {block.meta.map((entry) => (
          <div key={entry.label}>
            <dt className="mb-1.5 text-[12px] leading-[1.7] font-bold tracking-[0.1em] text-white uppercase">
              {entry.label}
            </dt>
            <dd className="m-0">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <div
      className={cn(
        'flex flex-1 items-stretch',
        // 折り返したときに写真が本文の上へ回り込まないよう、写真が左の段は逆順で畳む
        portraitLeft ? 'flex-wrap-reverse' : 'flex-wrap',
        !first && 'mt-[70px] border-t border-white/8',
      )}
    >
      {portraitLeft ? (
        <>
          {portrait}
          {text}
        </>
      ) : (
        <>
          {text}
          {portrait}
        </>
      )}
    </div>
  );
}
