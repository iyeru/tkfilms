import type { NavItem } from '@/content.types';
import { useScrollPast } from '@/hooks/useScrollPast';
import { cn } from '@/lib/cn';

type HeaderProps = {
  brandName: string;
  nav: NavItem[];
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (id: string) => void;
  onHome: () => void;
};

export function Header({ brandName, nav, menuOpen, onToggleMenu, onNavigate, onHome }: HeaderProps) {
  const solid = useScrollPast(200);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-100 flex items-center px-pad',
        'transition-[height,background-color] duration-300 ease-brand',
        solid ? 'h-[55px] bg-[rgb(12_12_12/0.88)]' : 'h-[75px]',
      )}
    >
      {/* 背景が明るい素材でもロゴが沈まないよう、上部だけ暗く落とす */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 to-transparent"
      />

      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          onHome();
        }}
        className="relative font-display text-[36px] leading-none tracking-[2px] text-white uppercase"
      >
        {brandName}
      </a>

      {/* 現在地は右のサイドドットが示すので、ここでは色を変えない */}
      <nav className="relative ml-auto hidden items-center gap-[30px] wide:flex">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
            className="text-[14px] leading-[normal] font-bold tracking-[1px] text-white uppercase transition-colors duration-300 hover:text-warm"
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
        className="relative ml-auto flex h-3 w-[50px] flex-col justify-between border-0 bg-transparent p-0 wide:hidden"
      >
        <span
          className={cn(
            'block h-0.5 bg-white transition-transform duration-300 ease-brand',
            menuOpen && 'translate-y-[5px] rotate-45',
          )}
        />
        <span
          className={cn(
            'block h-0.5 bg-white transition-opacity duration-200',
            menuOpen && 'opacity-0',
          )}
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
