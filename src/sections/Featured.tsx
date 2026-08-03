import type { Featured as FeaturedContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { cn, playerSrc } from '@/lib/cn';

export function Featured({ featured }: { featured: FeaturedContent }) {
  return (
    <Section id="featured" tone="alt" className="flex min-h-screen items-center">
      <SectionHeading title={featured.heading} lead={featured.lead} />

      <Reveal className="relative aspect-video overflow-hidden border border-white/8 bg-black">
        <iframe
          src={playerSrc(featured.youtubeId)}
          title={featured.heading}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </Reveal>

      {/*
        1本の作品から抜いたコンタクトシート。連番の並びなので比率は揃える。
        Works が画角を見せる場所なのに対し、ここは同じ作品の並びなので不揃いにしない
      */}
      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7">
        {featured.stills.map((still) => (
          <Reveal
            key={still.src}
            style={{ backgroundImage: `url(${still.src})` }}
            className={cn(
              'aspect-video border border-white/8 bg-bg bg-center',
              // シネスコ素材を 16:9 の枠に入れる分だけ、焼き込まれた黒帯を枠外へ逃がす。
              // cover と background-size が衝突するので、どちらか一方だけを当てる
              still.scope ? 'bg-[length:auto_132%] bg-no-repeat' : 'bg-cover',
            )}
          />
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-14">
        <div className="min-w-[280px] flex-1 basis-[380px]">
          <h3 className="mb-[18px] text-[16px] font-bold tracking-[0.16em] uppercase">
            {featured.messageHeading}
          </h3>
          <p className="text-base text-white/70">{featured.message}</p>
        </div>

        <div className="min-w-[240px] flex-1 basis-[260px]">
          <h3 className="mb-[18px] text-[16px] font-bold tracking-[0.16em] uppercase">
            {featured.creditHeading}
          </h3>
          <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[15px] leading-[1.6]">
            {featured.credits.map((credit) => (
              <div key={credit.label} className="contents">
                <dt className="tracking-[0.08em] text-white/40">{credit.label}</dt>
                <dd className="m-0 text-white/85">{credit.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
