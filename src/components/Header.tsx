import type { NavItem, SectionId } from '@/content.types';
import { useScrollPast } from '@/hooks/useScrollPast';
import { cn } from '@/lib/cn';

type HeaderProps = {
  brandName: string;
  nav: NavItem[];
  active: SectionId;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export function Header({ brandName, nav, active, menuOpen, onToggleMenu }: HeaderProps) {
  const solid = useScrollPast(200);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-100 flex items-center px-pad',
        'transition-[height,background-color] duration-300 ease-brand',
        solid ? 'h-[55px] bg-[rgb(12_12_12/0.88)] backdrop-blur-[6px]' : 'h-[70px]',
      )}
    >
      {/* 背景が明るい素材でもロゴが沈まないよう、上部だけ暗く落とす */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 to-transparent"
      />

      <a
        href="#home"
        className="relative font-display text-[34px] leading-none tracking-[2px] text-white uppercase"
      >
        {brandName}
      </a>

      <nav className="relative ml-auto hidden gap-7 wide:flex">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent',
              active === item.id ? 'text-accent' : 'text-white',
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-label="メニュー"
        aria-expanded={menuOpen}
        aria-controls="drawer"
        onClick={onToggleMenu}
        className="relative ml-auto flex h-3 w-11 flex-col justify-between border-0 bg-transparent p-0 wide:hidden"
      >
        <span
          className={cn(
            'block h-0.5 bg-white transition-transform duration-300 ease-brand',
            menuOpen && 'translate-y-[5px] rotate-45',
          )}
        />
        <span
          className={cn('block h-0.5 bg-white transition-opacity duration-200', menuOpen && 'opacity-0')}
        />
        <span
          className={cn(
            'block h-0.5 bg-white transition-transform duration-300 ease-brand',
            menuOpen && '-translate-y-[5px] -rotate-45',
          )}
        />
      </button>
    </header>
  );
}
