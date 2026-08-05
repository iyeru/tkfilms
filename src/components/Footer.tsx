import type { Brand, Footer as FooterContent } from '@/content.types';

export function Footer({ brand, footer }: { brand: Brand; footer: FooterContent }) {
  return (
    <footer className="bg-bg px-6 pt-[90px] text-center">
      <div className="font-display text-[clamp(64px,9vw,96px)] leading-none tracking-[2px] uppercase">
        {brand.name}
      </div>
      <p className="mt-3.5 mb-[34px] text-[14px] leading-[normal] tracking-[0.24em] text-white/50 uppercase">
        {brand.role}
      </p>

      <div className="mt-[70px] border-t border-white/8 py-[26px] text-[12px] leading-[normal] tracking-[0.12em] text-white/40">
        {footer.copyright}
      </div>
    </footer>
  );
}
