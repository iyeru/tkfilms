import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

type RevealProps<T extends ElementType> = {
  /** 描画するタグ。グリッドの子に使うときは div 以外を指定できる */
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/**
 * 画面に入ったときに下からふわりと現れる。
 * ラッパー要素を増やさずタグ自体に効くので、グリッドの子にそのまま使える。
 */
export function Reveal<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = (as ?? 'div') as ElementType;

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={cn(
        'transition-[opacity,transform] duration-800 ease-brand',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
