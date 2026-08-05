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
