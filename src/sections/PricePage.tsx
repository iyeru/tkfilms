import { useState } from 'react';
import type { PricePage as PricePageContent } from '@/content.types';
import { cn, playerSrc } from '@/lib/cn';

export function PricePage({ price, onBack }: { price: PricePageContent; onBack: () => void }) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <section className="bg-bg-alt px-6 pt-[190px] pb-[90px] text-center">
        <h1 className="font-display text-[clamp(64px,10vw,110px)] leading-none tracking-[2px] uppercase">
          {price.heading}
        </h1>
        <p className="mt-[18px] text-base text-white/65">{price.lead}</p>
      </section>

      {/* 枠が 3:1 と横長なので、シネスコ素材でも cover だけで黒帯が枠外に落ちる */}
      <div
        className="relative flex h-[min(60vh,480px)] w-full items-center justify-center bg-bg bg-cover bg-center"
        style={{ backgroundImage: `url(${price.keyVisual})` }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-[rgb(12_12_12/0.15)] to-[rgb(12_12_12/0.6)]"
        />
        <span
          aria-hidden
          className="absolute bottom-[26px] left-1/2 -translate-x-1/2 animate-bob text-[22px] text-white/60"
        >
          ⌄
        </span>
      </div>

      <section className="bg-bg px-6 py-[110px]">
        <div className="mx-auto max-w-[1140px]">
          <h2 className="text-center font-display text-[clamp(56px,8vw,88px)] leading-none tracking-[1px] uppercase">
            {price.plansHeading}
          </h2>
          <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-7">
            {price.plans.map((plan) => (
              <div key={plan.tag} className="border border-white/12 p-9">
                <p className="mb-2.5 text-xs font-bold tracking-[0.24em] text-cool uppercase">
                  {plan.tag}
                </p>
                <h3 className="mb-1.5 font-display text-[40px] leading-none tracking-[1px] uppercase">
                  {plan.title}
                </h3>
                <p className="mb-[22px] text-[15px] leading-[1.8] text-white/60">{plan.desc}</p>
                {/* 金額は「仕様」側。等幅にして桁を読ませる */}
                <p className="font-mono text-[38px] tracking-[-0.01em] text-white">
                  {plan.price}
                  <span className="text-[13px] tracking-normal text-cool">{plan.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg px-6 pb-[110px]">
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center gap-14">
          <div className="relative aspect-video min-w-[300px] flex-1 basis-[460px] overflow-hidden border border-white/8 bg-black">
            <iframe
              src={playerSrc(price.specYoutubeId)}
              title={price.specHeading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <div className="min-w-[300px] flex-1 basis-[340px]">
            <h3 className="font-display text-[40px] leading-none tracking-[1px] uppercase">
              {price.specHeading}
            </h3>
            <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-[22px] gap-y-3 text-[15px] leading-[1.7]">
              {price.spec.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="tracking-[0.08em] text-white/40">{row.label}</dt>
                  <dd className="m-0 text-white/85">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper px-6 py-[110px]">
        <div className="mx-auto max-w-[1140px]">
          <h2 className="text-center font-display text-[clamp(56px,8vw,88px)] leading-none tracking-[1px] text-[#17181B] uppercase">
            {price.optionsHeading}
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-9 border-b border-black/10">
            {price.options.map((option, i) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setTab(i)}
                className={cn(
                  'border-b-[3px] pb-3.5 text-sm font-bold tracking-[0.14em] uppercase transition-colors duration-300',
                  i === tab
                    ? 'border-warm text-[#17181B]'
                    : 'border-transparent text-[rgb(23_24_27/0.45)]',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-[720px] text-center text-base text-[#3D4047]">
            {price.options[tab].body}
          </p>
        </div>
      </section>

      <section className="bg-bg px-6 py-[110px]">
        <div className="mx-auto max-w-[1140px]">
          {/* 01/02/03 は実際に順序が情報を持つ工程なので番号を残す。寒色＝仕様の側 */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-11 text-center">
            {price.flow.map((step) => (
              <div key={step.no}>
                <div className="font-display text-[56px] leading-none text-cool">{step.no}</div>
                <h3 className="mt-3.5 mb-3 text-[15px] font-bold tracking-[0.14em] uppercase">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[1.85] text-white/62">{step.text}</p>
              </div>
            ))}
          </div>

          <ul className="mx-auto mt-[72px] grid max-w-[720px] list-none gap-4 p-0">
            {price.notes.map((note) => (
              <li key={note} className="flex items-start gap-3.5 text-base leading-[1.8] text-white/78">
                <span className="font-bold text-cool">✓</span>
                {note}
              </li>
            ))}
          </ul>

          <div className="mt-14 flex justify-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="inline-block border-2 border-warm bg-[linear-gradient(to_top,var(--color-warm)_50%,transparent_50%)] bg-[length:100%_200%] bg-[position:0_0] px-[35px] py-[18px] text-base font-bold tracking-[0.08em] text-white uppercase transition-[background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-bg"
            >
              {price.backLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
