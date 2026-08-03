import { useEffect } from 'react';
import type { NavItem } from '@/content.types';
import { cn } from '@/lib/cn';

type DrawerProps = {
  nav: NavItem[];
  open: boolean;
  onClose: () => void;
};

/** 狭い画面用のスライドインメニュー。背景の暗幕もここが持つ */
export function Drawer({ nav, open, onClose }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-105 bg-black/55 transition-opacity duration-500 ease-brand',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        id="drawer"
        aria-label="メニュー"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-110 w-[min(240px,74vw)] bg-[#151515]',
          'flex flex-col items-center justify-center gap-1.5',
          'transition-[transform,visibility] duration-500 ease-brand',
          open ? 'visible translate-x-0' : 'invisible translate-x-full',
        )}
      >
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={onClose}
            tabIndex={open ? undefined : -1}
            className="text-[19px] leading-[2.8] font-bold tracking-[1px] text-white uppercase hover:text-accent"
          >
            {item.label}
          </a>
        ))}
      </aside>
    </>
  );
}
