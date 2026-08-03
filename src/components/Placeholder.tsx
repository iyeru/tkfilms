import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** 素材差し替え待ちを示す斜線ブロック */
export function Placeholder({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn(
        'hatch flex items-center justify-center border border-white/8 p-4 text-center',
        'font-mono text-[11px] tracking-[0.14em] text-white/30 uppercase',
        className,
      )}
    >
      {children}
    </div>
  );
}
