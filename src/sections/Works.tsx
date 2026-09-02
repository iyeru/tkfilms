import { useState } from 'react';
import type { WorkClient, WorkItem, Works as WorksContent, WorksFeature } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { useInView } from '@/hooks/useInView';
import { bgVideoSrc, cn, mediaUrl } from '@/lib/cn';

export function Works({ works }: { works: WorksContent }) {
  return (
    <Section id="works" className="flex min-h-screen items-center">
      <SectionHeading title={works.heading} tracking="2px" />
      <Feature feature={works.feature} />
      {works.feature.client && <ClientCredit client={works.feature.client} />}

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
 *
 * 枠の中には何も乗せない。作品名と分類を重ねていたが、作品が何であるかは
 * 映像そのものと真下のクレジットが言っている。文字を読ませるために敷いていた
 * 黒幕も一緒に外した（幕だけ残すと先方の映像が理由なく暗いままになる）。
 *
 * 枠線も引かない。暗い地の上では white/8 の線が映像の縁として見えてしまう。
 *
 * 左右の矢印とスライドのドットも置いていない。押しても動かない飾りで、
 * 実在の取引先の作品に「他にも控えている」と言わせる嘘になっていた。
 * 作品が複数並ぶようになったら、本当に動くものとして入れ直すこと。
 */
function Feature({ feature }: { feature: WorksFeature }) {
  // 画面外にある枠に動画を先読みさせない。Hero と違ってここは折り返しの下にある
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="relative aspect-4/3 overflow-hidden bg-bg bg-cover bg-center duo:aspect-21/9"
      style={{ backgroundImage: `url(${mediaUrl(feature.poster)})` }}
    >
      {/* 自前の動画。読み込みが済むまでは poster の1枚が出る */}
      {feature.videoSrc && inView && (
        <video
          src={mediaUrl(feature.videoSrc)}
          poster={mediaUrl(feature.poster)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-label={feature.title}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 [animation:videoIn_1.2s_ease_0.6s_forwards]"
        />
      )}

      {!feature.videoSrc && feature.youtubeId && (
        <iframe
          src={bgVideoSrc(feature.youtubeId)}
          title={feature.title}
          allow="autoplay; encrypted-media"
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-video w-full min-w-[570px] -translate-x-1/2 -translate-y-1/2 border-0 opacity-0 [animation:videoIn_1.6s_ease_4s_forwards]"
        />
      )}
    </div>
  );
}

/**
 * 代表作の発注元。映像の外、平らな地の上に置く。
 * 支給ロゴは細い筆文字で、動いている映像に重ねるとストロークが背景に負ける。
 * 枠の左端に揃えた1行にすると、写真に添えるキャプションと同じ読み方になり、
 * 「実績の壁」ではなく「この作品の相手」として読める。
 */
function ClientCredit({ client }: { client: WorkClient }) {
  return (
    <Reveal className="mt-[22px] flex flex-wrap items-center gap-x-5 gap-y-3">
      <span className="font-mono text-[11px] leading-[normal] tracking-[0.24em] text-cool uppercase">
        {client.label}
      </span>
      <span aria-hidden className="h-px w-7 bg-white/20" />
      <img
        src={mediaUrl(client.logo)}
        alt={client.name}
        width={800}
        height={296}
        loading="lazy"
        decoding="async"
        className="h-[clamp(40px,6vw,62px)] w-auto"
      />
    </Reveal>
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
      style={{ aspectRatio: item.ratio, backgroundImage: `url(${mediaUrl(item.thumb)})` }}
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
