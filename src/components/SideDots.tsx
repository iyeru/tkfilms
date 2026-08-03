import type { NavItem, SectionId } from '@/content.types';
import { cn } from '@/lib/cn';

/**
 * 画面右端の現在地インジケータ。広い画面でだけ出る。
 * ヘッダーのナビと内容が重複するため、支援技術からは隠しキーボード操作の対象からも外す。
 */
export function SideDots({
  dots,
  active,
  onNavigate,
}: {
  dots: NavItem[];
  active: SectionId;
  onNavigate: (id: string) => void;
}) {
  return (
    <div
      aria-hidden
      className="fixed top-1/2 right-[44px] z-99 hidden -translate-y-1/2 flex-col gap-3.5 wide:flex"
    >
      {dots.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.id);
          }}
          className={cn(
            'group relative h-3 w-3 rounded-full border-2 border-white transition-colors duration-300',
            active === item.id ? 'bg-white' : 'bg-transparent',
          )}
        >
          <span className="absolute top-1/2 right-[22px] -translate-y-1/2 text-[11px] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}

/** 右下のページ先頭へ戻るボタン */
export function BackToTop({ visible }: { visible: boolean }) {
  return (
    <button
      type="button"
      aria-label="ページ先頭へ戻る"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed right-[50px] bottom-[125px] z-98 h-[50px] w-[50px] border-0 text-base text-white',
        'bg-[linear-gradient(to_top,var(--color-warm)_50%,#333_50%)] bg-[length:100%_200%] bg-[position:0_0]',
        'transition-[opacity,background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-bg',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      ↑
    </button>
  );
}
