import { useState, type ComponentPropsWithoutRef } from 'react';
import type { FeaturedWork, WorkItem, Works as WorksContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { cn } from '@/lib/cn';

export function Works({ works }: { works: WorksContent }) {
  return (
    <Section id="works">
      <SectionHeading title={works.heading} lead={works.lead} />
      <FeaturedSlider slides={works.featured} />
      <div className="mt-[42px] grid grid-cols-1 gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:gap-[26px]">
        {works.items.map((item, i) => (
          <WorkCard key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <a
          href="#works"
          className="border-2 border-accent bg-[linear-gradient(to_top,#0C0C0C_50%,var(--color-accent)_50%)] bg-[length:100%_200%] bg-[position:0_0] px-[33px] py-[13px] text-[13px] font-bold tracking-[0.14em] text-bg uppercase transition-[background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-accent"
        >
          View more
        </a>
      </div>
    </Section>
  );
}

const CARD =
  'group relative aspect-video overflow-hidden transition-[transform,box-shadow,border-color] duration-450 ease-brand hover:-translate-y-2.5 hover:border-white/22 hover:shadow-[0_26px_50px_-14px_rgb(0_0_0/0.85)]';

function WorkCard({ item }: { item: WorkItem }) {
  if (item.youtubeId) {
    return (
      <Reveal className={CARD}>
        <iframe
          src={`https://www.youtube.com/embed/${item.youtubeId}`}
          title={item.title}
          loading="lazy"
          allowFullScreen
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          className="h-full w-full border-0"
        />
      </Reveal>
    );
  }

  // 動画IDが入るまでは斜線とタイトルだけ出す。ホバーで大見出しに切り替わる
  return (
    <Reveal className={cn(CARD, 'hatch border border-white/8')}>
      <PlayIcon className="border-l-white" />
      <p className="pointer-events-none absolute inset-x-0 bottom-0 px-[18px] py-4 text-[13px] tracking-[0.1em] text-white/60">
        {item.title}
      </p>

      <div className="pointer-events-none absolute inset-0 bg-[rgb(10_10_10/0.9)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="absolute top-3.5 left-5 font-display text-[38px] leading-[1.1] tracking-[1px] text-white uppercase">
          {item.title}
        </p>
        <PlayIcon className="border-l-accent" />
        <p className="absolute bottom-3.5 left-5 font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">
          preview autoplay / muted
        </p>
      </div>
    </Reveal>
  );
}

function PlayIcon({ className }: { className: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className={cn('ml-[5px] h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent', className)} />
    </div>
  );
}

function FeaturedSlider({ slides }: { slides: FeaturedWork[] }) {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <div className="relative mt-[30px] flex aspect-[21/9] min-h-[320px] items-center justify-center overflow-hidden border border-white/8 hatch">
      <div aria-hidden className="absolute inset-0 bg-[rgb(12_12_12/0.45)]" />

      <div className="relative px-[70px] text-center">
        <p className="mb-3.5 text-xs font-bold tracking-[0.24em] text-accent uppercase">
          {slide.category}
        </p>
        <h3 className="font-display text-[clamp(48px,7vw,80px)] leading-none tracking-[2px] text-white uppercase">
          {slide.title}
        </h3>
      </div>

      {/* design/では件数に関わらず矢印を常時表示するため、1件でも隠さない */}
      <SliderButton aria-label="Previous" onClick={() => go(-1)} className="left-[22px]">
        ‹
      </SliderButton>
      <SliderButton aria-label="Next" onClick={() => go(1)} className="right-[22px]">
        ›
      </SliderButton>

      <div className="absolute bottom-[22px] left-1/2 flex -translate-x-1/2 gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`${i + 1}枚目を表示`}
            onClick={() => setIndex(i)}
            className={cn(
              'h-[9px] w-[9px] rounded-full',
              i === index ? 'bg-accent' : 'bg-white/35',
            )}
          />
        ))}
      </div>
    </div>
  );
}

function SliderButton({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<'button'> & { className: string }) {
  return (
    <button
      type="button"
      className={cn(
        'absolute top-1/2 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-base text-white transition-[background-color,color,border-color,transform] duration-350 ease-brand hover:scale-[1.12] hover:border-accent hover:bg-accent hover:text-bg',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
