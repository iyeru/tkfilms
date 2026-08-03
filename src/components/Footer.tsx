import type { Brand, Footer as FooterContent } from '@/content.types';
import { externalLinkProps } from '@/lib/cn';

export function Footer({ brand, footer }: { brand: Brand; footer: FooterContent }) {
  return (
    <footer className="bg-bg px-pad pt-[90px] text-center">
      <div className="font-display text-[clamp(64px,9vw,96px)] leading-none tracking-[2px] uppercase">
        {brand.name}
      </div>
      <p className="mt-3.5 mb-[34px] text-[14px] leading-[normal] tracking-[0.24em] text-white/50 uppercase">
        {brand.role}
      </p>

      <div className="flex justify-center gap-[18px]">
        {footer.sns.map((sns) => (
          <a
            key={sns.name}
            href={sns.href}
            aria-label={sns.name}
            {...externalLinkProps(sns.href)}
            className="flex h-15 w-15 items-center justify-center rounded-full border border-white/35 text-[12px] leading-[normal] font-bold tracking-[0.1em] text-white transition-[background-color,color,border-color] duration-300 hover:border-warm hover:bg-warm hover:text-bg"
          >
            {sns.label}
          </a>
        ))}
      </div>

      <div className="mt-[70px] border-t border-white/8 py-[26px] text-[12px] leading-[normal] tracking-[0.12em] text-white/40">
        {footer.copyright}
      </div>
    </footer>
  );
}
