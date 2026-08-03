import { useEffect, useState } from 'react';
import type { SectionId } from '@/content.types';

/**
 * いま画面の主役になっているセクションの id を返す。
 * ヘッダーのナビとサイドドットの現在地表示に使う。
 *
 * ids はレンダリングのたびに作り直さないこと（コンポーネント外で定義する）。
 */
export function useActiveSection(ids: readonly SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { threshold: 0.4 },
    );

    for (const id of ids) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
