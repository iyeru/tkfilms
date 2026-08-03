import type { WorkItem, Works as WorksContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { cn } from '@/lib/cn';

export function Works({ works }: { works: WorksContent }) {
  return (
    <Section id="works">
      <SectionHeading title={works.heading} lead={works.lead} />
      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:gap-[26px]">
        {works.items.map((item, i) => (
          <WorkCard key={`${item.title}-${i}`} item={item} />
        ))}
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

  // 動画IDが入るまでは斜線とタイトルだけ出す
  return (
    <Reveal className={cn(CARD, 'hatch border border-white/8 text-center')}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="ml-[5px] h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white transition-colors duration-300 group-hover:border-l-accent" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgb(10_10_10/0.9)] to-transparent px-4 py-3.5">
        <p className="text-[11px] font-bold tracking-[0.22em] text-accent uppercase">
          {item.category}
        </p>
        <p className="text-sm leading-[1.5] tracking-[0.08em] text-white/85">{item.title}</p>
      </div>
    </Reveal>
  );
}
