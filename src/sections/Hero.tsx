import type { Hero as HeroContent } from '@/content.types';
import { bgVideoSrc } from '@/lib/cn';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    // 高さは design/ の 100vh ではなく 100svh を使う（モバイルのアドレスバー分のガタつきを避けるため）
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden bg-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${hero.poster})` }}
    >
      {/* 再生が始まるまではサムネイルを見せ、遅れてフェードで差し替える */}
      {hero.youtubeId && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <iframe
            src={bgVideoSrc(hero.youtubeId, 12)}
            title="Showreel"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 h-[max(56.25vw,100vh)] max-h-none w-[max(100vw,177.78vh)] max-w-none min-h-[620px] min-w-[1102px] -translate-x-1/2 -translate-y-1/2 scale-[1.4] border-0 opacity-0 [animation:videoIn_1.6s_ease_4s_forwards]"
          />
        </div>
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(12_12_12/0.45)_0%,rgb(12_12_12/0.92)_100%)]"
      />

      {hero.mediaNote && (
        <div className="absolute bottom-[38px] left-pad z-2 font-mono text-[11px] tracking-[0.2em] text-white/28 uppercase">
          {hero.mediaNote}
        </div>
      )}

      <div className="relative z-2 px-6 text-center">
        {/* 肩書きと所在は等幅・寒色に落として「仕様」の側に置き、名前だけを見せる */}
        <p className="mb-[22px] font-mono text-[clamp(11px,1.4vw,13px)] tracking-[0.34em] text-cool uppercase">
          {hero.eyebrow}
        </p>
        <h1 className="text-[clamp(34px,6vw,48px)] leading-none font-medium tracking-[0.26em] uppercase">
          {hero.title}
        </h1>
        <p className="mt-[30px] font-mono text-[11px] tracking-[0.28em] text-cool">{hero.meta}</p>
      </div>

      <a
        href="#works"
        aria-label="下へスクロール"
        className="absolute bottom-[38px] left-1/2 z-2 -translate-x-1/2 animate-bob text-[22px] text-white/60"
      >
        ⌄
      </a>
    </section>
  );
}
