import type { Portfolio as PortfolioContent, PortfolioItem } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { cn, playerSrc } from '@/lib/cn';

/**
 * Works の下に並ぶポートフォリオ。すべて YouTube 限定公開の埋め込みで、
 * 自動再生はしない（Works のカードと違い、音声込みで見せる想定のため）。
 * 埋め込み自体は最初から表示し、再生は YouTube 側のボタンに任せる。
 */
export function Portfolio({ portfolio }: { portfolio: PortfolioContent }) {
  return (
    <Section id="portfolio">
      <SectionHeading title={portfolio.heading} tracking="1px" />

      <div className="mt-[42px] grid grid-cols-1 gap-7 duo:grid-cols-2">
        {portfolio.items.map((item) => (
          <PortfolioCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Reveal
      motion="fade"
      className={cn(
        'relative aspect-video overflow-hidden border border-white/8 bg-[#131418]',
        item.wide && 'duo:col-span-2',
      )}
    >
      {item.youtubeId ? (
        <iframe
          src={playerSrc(item.youtubeId)}
          title={item.title}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div
          aria-label={`${item.title}（準備中）`}
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3"
        >
          <span
            aria-hidden
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/70 opacity-40"
          >
            <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-cool uppercase">Coming soon</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgb(10_10_10/0.85)] to-transparent px-[18px] py-4">
        <span className="text-[13px] tracking-[0.1em] text-white/85">{item.title}</span>
      </div>
    </Reveal>
  );
}
