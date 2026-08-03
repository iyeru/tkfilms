import type { PriceCta as PriceCtaContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';

/** トップページから料金ページへ送る導線 */
export function PriceCta({ price, onOpen }: { price: PriceCtaContent; onOpen: () => void }) {
  return (
    <section
      id="price"
      className="flex min-h-[70vh] items-center justify-center bg-bg-alt px-6 py-[110px] text-center"
    >
      <div className="max-w-[720px]">
        <Reveal>
          <h2 className="font-display text-[clamp(64px,9vw,96px)] leading-none tracking-[1px] uppercase">
            {price.heading}
          </h2>
        </Reveal>
        <p className="mb-10 text-base text-white/70">{price.lead}</p>
        <a
          href="#price"
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
          className="inline-block border-2 border-warm bg-[linear-gradient(to_top,var(--color-warm)_50%,transparent_50%)] bg-[length:100%_200%] bg-[position:0_0] px-[35px] py-[18px] text-base font-bold tracking-[0.08em] text-white uppercase transition-[background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-bg"
        >
          {price.label}
        </a>
      </div>
    </section>
  );
}
