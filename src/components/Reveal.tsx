import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

type RevealProps<T extends ElementType> = {
  /** 描画するタグ。グリッドの子に使うときは div 以外を指定できる */
  as?: T;
  /**
   * 現れ方。原本の data-anim に対応する。
   * - `up`   … 下から 30px ぶん持ち上げながら現れる。見出しに使う
   * - `fade` … 透明度だけで現れる。transform をホバーに明け渡すカードに使う。
   *            この場合 transition は呼び出し側が className で丸ごと持つこと
   *            （ここでも指定すると宣言が競合し、後勝ちで片方が消える）
   */
  motion?: 'up' | 'fade';
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/**
 * 画面に入ったときに現れる。
 * ラッパー要素を増やさずタグ自体に効くので、グリッドの子にそのまま使える。
 */
export function Reveal<T extends ElementType = 'div'>({
  as,
  motion = 'up',
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
        // Tailwind v4 の translate ユーティリティは transform ではなく
        // translate プロパティを書くので、遷移対象もそちらを指す
        motion === 'up' && 'transition-[opacity,translate] duration-800 ease-brand',
        motion === 'up' && (inView ? 'translate-y-0' : 'translate-y-[30px]'),
        inView ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
