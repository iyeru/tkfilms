import { useState } from 'react';
import type { WorkItem, Works as WorksContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { bgVideoSrc, cn } from '@/lib/cn';

export function Works({ works }: { works: WorksContent }) {
  return (
    <Section id="works" className="flex min-h-screen items-center">
      <SectionHeading title={works.heading} tracking="2px" />
      <Feature feature={works.feature} />

      {/*
        作品を一律 16:9 に切り揃えず、撮られた画角のまま並べる。
        シネスコ(2.39:1)の作品は2カラム分を占め、帯の分だけ横に長い枠になる。
        不揃いは内容が決めたもので、比率そのものがこの人の仕事の情報になる
      */}
      <div className="mt-[42px] grid grid-cols-1 gap-7 duo:grid-cols-2">
        {works.items.map((item) => (
          <WorkCard key={item.youtubeId} item={item} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="#works"
          className="border-2 border-warm bg-[linear-gradient(to_top,var(--color-bg)_50%,var(--color-warm)_50%)] bg-[length:100%_200%] bg-[position:0_0] px-[33px] py-[13px] text-[13px] leading-[normal] font-bold tracking-[0.14em] text-bg uppercase transition-[background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-warm"
        >
          {works.moreLabel}
        </a>
      </div>
    </Section>
  );
}

/**
 * 上部の1本を大きく見せる枠。
 * aspect-ratio と min-height を併用すると高さから幅が逆算されて画面幅を超えるため、
 * 狭い画面では比率そのものを変えて幅の下限を作らない。
 */
function Feature({ feature }: { feature: WorksContent['feature'] }) {
  return (
    <div
      className="relative flex aspect-4/3 items-center justify-center overflow-hidden border border-white/8 bg-bg bg-cover bg-center duo:aspect-21/9"
      style={{ backgroundImage: `url(${feature.poster})` }}
    >
      <iframe
        src={bgVideoSrc(feature.youtubeId)}
        title={feature.title}
        allow="autoplay; encrypted-media"
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-video w-full min-w-[570px] -translate-x-1/2 -translate-y-1/2 border-0 opacity-0 [animation:videoIn_1.6s_ease_4s_forwards]"
      />
      <div aria-hidden className="absolute inset-0 bg-[rgb(12_12_12/0.5)]" />

      <div className="relative px-[clamp(22px,8vw,70px)] text-center">
        <p className="mb-3.5 text-[12px] leading-[normal] font-bold tracking-[0.24em] text-cool uppercase">
          {feature.category}
        </p>
        <h3 className="font-display text-[clamp(34px,7vw,80px)] leading-none tracking-[2px] uppercase">
          {feature.title}
        </h3>
      </div>

      <SlideButton side="prev" />
      <SlideButton side="next" />

      <div className="absolute bottom-[22px] left-1/2 flex -translate-x-1/2 gap-2.5">
        {Array.from({ length: feature.slides }, (_, i) => (
          <span
            key={i}
            className={cn('h-[9px] w-[9px] rounded-full', i === 0 ? 'bg-cool' : 'bg-white/35')}
          />
        ))}
      </div>
    </div>
  );
}

function SlideButton({ side }: { side: 'prev' | 'next' }) {
  return (
    <button
      type="button"
      aria-label={side === 'prev' ? '前の作品' : '次の作品'}
      className={cn(
        'absolute top-1/2 h-[clamp(40px,11vw,52px)] w-[clamp(40px,11vw,52px)] -translate-y-1/2 rounded-full border border-white/40 bg-black/25 text-[16px] leading-[normal] text-white',
        'transition-[background-color,color,border-color,scale] duration-350 ease-brand hover:scale-112 hover:border-warm hover:bg-warm hover:text-bg',
        side === 'prev' ? 'left-[clamp(10px,3vw,22px)]' : 'right-[clamp(10px,3vw,22px)]',
      )}
    >
      {side === 'prev' ? '‹' : '›'}
    </button>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  const [playing, setPlaying] = useState(false);
  const wide = item.ratio === '2.39/1';

  return (
    <Reveal
      // 現れるのは透明度だけ。transform はホバーの持ち上げに使うので譲る。
      // transition は1つの宣言にまとめる（Reveal 側と2本立てると後勝ちで片方が消える）
      motion="fade"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      style={{ aspectRatio: item.ratio, backgroundImage: `url(${item.thumb})` }}
      className={cn(
        'group relative cursor-pointer overflow-hidden border border-white/8 bg-[#131418] bg-cover bg-center will-change-transform',
        '[transition:opacity_.8s_ease,translate_.45s_var(--ease-brand),scale_.45s_var(--ease-brand),box-shadow_.45s_ease,border-color_.45s_ease]',
        'hover:z-2 hover:-translate-y-3.5 hover:scale-102 hover:border-white/22 hover:shadow-[0_26px_50px_-14px_rgb(0_0_0/0.85)]',
        // シネスコは2カラムぶんを占めて、画角の差がそのまま並びに出る
        wide && 'duo:col-span-2',
      )}
    >
      {playing ? (
        <iframe
          src={bgVideoSrc(item.youtubeId)}
          title={item.title}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute inset-0 h-full w-full scale-145 border-0"
        />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-[rgb(12_12_12/0.4)]" />
          <div aria-hidden className="absolute inset-0 flex items-center justify-center">
            <span className="ml-[5px] h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
          </div>
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3.5 bg-linear-to-t from-[rgb(10_10_10/0.85)] to-transparent px-[18px] py-4">
        <span className="text-[13px] tracking-[0.1em] text-white/85">{item.title}</span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-cool">{item.ratioLabel}</span>
      </div>
    </Reveal>
  );
}
