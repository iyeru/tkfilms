import type { WorkClient, Works as WorksContent, WorksFeature } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { useInView } from '@/hooks/useInView';
import { bgVideoSrc, mediaUrl } from '@/lib/cn';

export function Works({ works }: { works: WorksContent }) {
  return (
    <Section id="works" className="flex min-h-screen items-center">
      <SectionHeading title={works.heading} tracking="2px" />
      <div className="mt-[42px]">
        <Feature feature={works.feature} />
      </div>
      {works.feature.client && <ClientCredit client={works.feature.client} />}
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
