import { useEffect, useState } from 'react';

/**
 * 縦スクロール量が threshold を超えているかを返す。
 * 真偽が変わったときしか state を更新しないので、スクロール中に再描画され続けることはない。
 */
export function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return past;
}
