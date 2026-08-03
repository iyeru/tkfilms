import type { Hero as HeroContent } from '@/content.types';
import { Rule } from '@/components/Section';
import { asset } from '@/lib/cn';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    // min-h/heightはdesign/の100vhではなく100svhを使う（モバイルのアドレスバー分のガタつきを避けるため）
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden after:absolute after:inset-0 after:content-[''] after:bg-[radial-gradient(ellipse_at_center,rgb(12_12_12/0.25)_0%,rgb(12_12_12/0.9)_100%)]"
    >
      <HeroBackground media={hero.media} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-55 [background-image:radial-gradient(rgba(0,0,0,.85)_1px,transparent_1px)] [background-size:4px_4px]"
      />

      <div className="relative z-2 px-6 text-center">
        <p className="mb-4 font-slim text-[clamp(18px,3vw,26px)] font-thin tracking-[0.18em] text-white/90">
          {hero.eyebrow}
        </p>
        <h1 className="font-slim text-[clamp(32px,6vw,45px)] leading-[1.2] font-normal tracking-[0.24em] uppercase">
          {hero.title}
        </h1>
        {hero.copy && (
          <p className="mt-[22px] text-[15px] tracking-[0.04em] text-white/70">{hero.copy}</p>
        )}
        <Rule className="mt-[34px]" />
      </div>

      {hero.mediaNote && !hero.media && (
        <div className="absolute bottom-[38px] left-pad z-2 font-mono text-[10px] tracking-[0.2em] text-white/28 uppercase">
          {hero.mediaNote}
        </div>
      )}

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

function HeroBackground({ media }: { media: HeroContent['media'] }) {
  if (media?.type === 'video') {
    return (
      <div className="absolute inset-0">
        <video
          src={asset(media.src)}
          poster={media.poster ? asset(media.poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (media?.type === 'image') {
    return (
      <div className="absolute inset-0">
        <img src={asset(media.src)} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  // 素材が入るまでの斜線
  return (
    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#181818_0_10px,#121212_10px_20px)]" />
  );
}
