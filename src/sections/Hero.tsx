import type { Hero as HeroContent } from '@/content.types';
import { bgVideoSrc, mediaUrl } from '@/lib/cn';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    // 高さは design/ の 100vh ではなく 100svh を使う（モバイルのアドレスバー分のガタつきを避けるため）
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden bg-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${mediaUrl(hero.poster)})` }}
    >
      {/* 自前の動画。読み込みが済むまでは poster の1枚が出る */}
      {hero.videoSrc && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            src={mediaUrl(hero.videoSrc)}
            poster={mediaUrl(hero.poster)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            // 素材は 16:9 の中にシネスコで収められている（上下に 72px ずつ黒帯）。
            // 1.25 倍（720 / 576）に伸ばすと、その帯がちょうど画面の外へ出る。
            className="absolute inset-0 h-full w-full scale-125 object-cover opacity-0 [animation:videoIn_1.2s_ease_0.6s_forwards]"
          />
        </div>
      )}

      {/* 再生が始まるまではサムネイルを見せ、遅れてフェードで差し替える */}
      {!hero.videoSrc && hero.youtubeId && (
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
        {/* 行間は原本と同じく既定のまま。leading-none にすると箱が縮んで上下の余白が変わる */}
        <h1 className="font-display text-[clamp(104px,28vw,176px)] tracking-[2px] uppercase">
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
