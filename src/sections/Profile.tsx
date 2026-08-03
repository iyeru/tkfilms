import { useState } from 'react';
import type { Profile as ProfileContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/cn';

/**
 * 現場のカットを全幅で見せる枠。経歴文は About が持つ。
 * 枠が横長なので、黒帯の入るシネスコ素材と、他社のロゴが写り込むカットは content 側で外している。
 */
export function Profile({ profile }: { profile: ProfileContent }) {
  const [slide, setSlide] = useState(0);
  const count = profile.slides.length;
  const go = (step: number) => setSlide((i) => (i + step + count) % count);

  return (
    <section id="profile" className="relative flex min-h-screen items-center bg-bg-alt py-[110px]">
      <div className="w-full">
        <div className="mx-auto mb-15 max-w-[1140px] px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(64px,9vw,96px)] leading-none tracking-[1px] uppercase">
              {profile.heading}
            </h2>
          </Reveal>
        </div>

        <div
          className="relative flex h-[min(62vh,520px)] w-full items-center justify-center bg-bg bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.slides[slide]})` }}
        >
          <div aria-hidden className="absolute inset-0 bg-[rgb(12_12_12/0.25)]" />
          <SlideButton side="prev" onClick={() => go(-1)} />
          <SlideButton side="next" onClick={() => go(1)} />
        </div>
      </div>
    </section>
  );
}

function SlideButton({ side, onClick }: { side: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={side === 'prev' ? '前の写真' : '次の写真'}
      onClick={onClick}
      className={cn(
        'absolute top-1/2 h-[70px] w-[70px] -translate-y-1/2 rounded-full border border-white/45 bg-transparent text-xl text-white',
        'transition-[background-color,color,border-color,transform] duration-350 ease-brand hover:scale-112 hover:border-warm hover:bg-warm hover:text-bg',
        side === 'prev' ? 'left-[clamp(16px,4vw,60px)]' : 'right-[clamp(16px,4vw,60px)]',
      )}
    >
      {side === 'prev' ? '‹' : '›'}
    </button>
  );
}
