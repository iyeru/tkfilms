import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * 起動時のローダー。書体の読み込みを待って畳むが、
 * 読み込みが遅くても 1.6 秒で必ず消える。
 */
export function Loader() {
  const [fadingOut, setFadingOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let done = false;
    const timers: number[] = [];

    const hide = () => {
      if (done) return;
      done = true;
      setFadingOut(true);
      timers.push(window.setTimeout(() => setRemoved(true), 600));
    };

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    void fontsReady.then(() => {
      if (!done) timers.push(window.setTimeout(hide, 400));
    });
    timers.push(window.setTimeout(hide, 1600));

    return () => {
      done = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden
      className={cn(
        'fixed inset-0 z-120 flex items-center justify-center bg-[#1D1D1D]',
        'transition-opacity duration-500 ease-brand',
        fadingOut && 'pointer-events-none opacity-0',
      )}
    >
      <div className="relative flex aspect-square w-[min(320px,70vw)] items-center justify-center rounded-full border border-white/12">
        <div className="absolute inset-[30px] rounded-full border border-white/8" />
        <div className="absolute inset-[30px] animate-ring rounded-full border border-transparent border-t-accent" />
        <span className="font-display text-[clamp(40px,12vw,56px)] leading-none tracking-[6px]">
          Loading
        </span>
      </div>
    </div>
  );
}

/** 全面に敷くフィルムグレイン */
export function Grain() {
  return <div aria-hidden className="film-grain pointer-events-none fixed inset-0 z-90 opacity-[0.055]" />;
}
