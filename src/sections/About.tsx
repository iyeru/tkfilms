import type { About as AboutContent } from '@/content.types';

/** 左に経歴、右に人物のカット。左右で埋める全幅のセクション */
export function About({ about }: { about: AboutContent }) {
  return (
    <section
      id="about"
      className="flex min-h-screen flex-wrap items-stretch bg-bg"
    >
      <div className="flex min-w-[min(100%,420px)] flex-1 basis-[520px] flex-col justify-center p-[clamp(40px,6vw,64px)]">
        <h2 className="font-display text-[clamp(56px,7vw,96px)] leading-none tracking-[1px] uppercase">
          {about.heading}
        </h2>

        <div>
          {about.body.map((paragraph, i) => (
            <p key={i} className="mb-6 text-base text-pretty text-white/70 last:mb-8">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-7 gap-y-5">
          {about.meta.map((entry) => (
            <div key={entry.label}>
              <dt className="mb-1.5 text-xs font-bold tracking-[0.1em] uppercase">{entry.label}</dt>
              <dd className="m-0 text-sm leading-[1.7] text-white/70">{entry.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="min-h-[60vh] min-w-[min(100%,360px)] flex-1 basis-[420px] bg-bg bg-cover bg-center"
        style={{ backgroundImage: `url(${about.portrait})` }}
      />
    </section>
  );
}
