import type { Brand, Footer as FooterContent } from '@/content.types';
import { externalLinkProps } from '@/lib/cn';

export function Footer({ brand, footer }: { brand: Brand; footer: FooterContent }) {
  return (
    <footer className="bg-bg px-pad pt-20 text-center">
      <div className="font-display text-[clamp(58px,14vw,96px)] leading-none tracking-[2px] uppercase">
        {brand.name}
      </div>
      <p className="mt-2.5 mb-[30px] text-[13px] tracking-[0.24em] text-white/50 uppercase">
        {brand.role}
      </p>

      <div className="flex justify-center gap-4">
        {footer.sns.map((sns) => (
          <a
            key={sns.name}
            href={sns.href}
            aria-label={sns.name}
            {...externalLinkProps(sns.href)}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 text-xs font-bold tracking-[0.1em] text-white transition-[background-color,color,border-color] duration-300 hover:border-accent hover:bg-accent hover:text-bg"
          >
            {sns.label}
          </a>
        ))}
      </div>

      <div className="mt-15 border-t border-white/8 py-6 text-xs tracking-[0.12em] text-white/40">
        {footer.copyright}
      </div>
    </footer>
  );
}
