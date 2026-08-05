import type { SiteContent } from '@/content.types';
import { cn } from '@/lib/cn';

/** Instagram 風の正方形グリッド */
export function Gram({ gram }: { gram: SiteContent['gram'] }) {
  return (
    <section className="bg-bg p-0">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-0">
        {gram.map((tile) => (
          <div
            key={tile.src}
            style={{ backgroundImage: `url(${tile.src})` }}
            className={cn(
              'aspect-square border-r border-b border-bg bg-bg bg-center',
              // 正方形は元の画角より狭いので、シネスコ素材だけ黒帯を枠外へ逃がす。
              // cover と background-size が衝突するので、どちらか一方だけを当てる
              tile.scope ? 'bg-[length:auto_132%] bg-no-repeat' : 'bg-cover',
            )}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * 架空のロゴ。Credit のダミー取引先と同じ名前を使い、仮素材の世界の中で辻褄が合うようにしている。
 * 実在企業は載せない。
 */
export function Partners({
  partners,
  note,
}: {
  partners: SiteContent['partners'];
  note: string;
}) {
  return (
    <section className="bg-bg-alt px-6 py-[70px]">
      <div className="mx-auto max-w-[1140px]">
        <p className="mb-[30px] text-center font-mono text-[11px] tracking-[0.2em] text-white/28 uppercase">
          {note}
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-[90px] flex-col items-center justify-center gap-[7px] border border-white/8"
            >
              <span className="font-display text-[30px] leading-none tracking-[2px] text-white/60 uppercase">
                {partner.name}
              </span>
              <span className="font-mono text-[9px] tracking-[0.24em] text-white/26 uppercase">
                {partner.kind}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
