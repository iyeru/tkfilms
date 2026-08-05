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
        // 高さ・背景・横ずらしを1つの宣言にまとめる。
        // transition ユーティリティを2つ重ねると後勝ちで片方が効かなくなる
        '[transition:height_.3s_var(--ease-brand),background-color_.3s_ease,translate_.5s_var(--ease-brand)]',
        solid ? 'h-[55px] bg-[rgb(12_12_12/0.88)]' : 'h-[75px]',
        // 本文と一緒にドロワーのぶんだけ左へ寄る
        menuOpen && '-translate-x-panel',
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
            className="text-[14px] leading-[normal] font-bold tracking-[1px] text-white uppercase hover:text-warm"
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
        {/* 原本と同じく3本のまま。開いても × には組み変わらない */}
        <span className="block h-0.5 w-full bg-white" />
        <span className="block h-0.5 w-full bg-white" />
        <span className="block h-0.5 w-full bg-white" />
      </button>
    </header>
  );
}
