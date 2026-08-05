import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';

/** ローダーを最低限見せておく時間。原本と同じ長さにしている */
const HOLD_MS = 1100;
/** 書体や回線が遅くても、ここまでには必ず畳む */
const MAX_MS = 6000;
/** 畳むまでの猶予。原本と同じ 520ms。下の duration-500 と揃えること */
const FADE_MS = 520;
/** 書体が hold より遅れて来たとき、見出しを見せてから畳むまでの余韻 */
const TAIL_MS = 800;
/** 動きを減らす設定の人を待たせない場合の時間 */
const CALM_HOLD_MS = 600;

export function Loader() {
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in');
  const [fontReady, setFontReady] = useState(false);

  const calm = useMemo(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    [],
  );
  const hold = calm ? CALM_HOLD_MS : HOLD_MS;

  useEffect(() => {
    let done = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const hide = () => {
      if (done) return;
      done = true;
      setPhase('out');
      at(FADE_MS, () => setPhase('gone'));
    };

    // 最低 hold ミリ秒は見せる。書体がそれより遅れて来たら、
    // 見出しが出てから TAIL_MS だけ残してから畳む
    const start = Date.now();
    let fontSettledAt: number | null = null;
    const settle = () => {
      if (fontSettledAt === null) return;
      const until = Math.max(hold, fontSettledAt - start + TAIL_MS);
      at(Math.max(0, until - (Date.now() - start)), hide);
    };

    at(hold, settle);
    at(MAX_MS, hide);

    // Six Caps は極端に細長い書体で、フォールバックだと文字幅が倍近くになりリングからはみ出す。
    // 読み込めたことを確認できるまで見出しは出さない（読み込めなければ出さないまま畳む）
    const loading = document.fonts?.load('56px "Six Caps"') ?? Promise.resolve([]);
    void loading
      .then((faces) => setFontReady(faces.length > 0))
      .catch(() => undefined)
      .finally(() => {
        fontSettledAt = Date.now();
        settle();
      });

    return () => {
      done = true;
      timers.forEach(clearTimeout);
    };
  }, [hold]);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden
      className={cn(
        'fixed inset-0 z-120 flex items-center justify-center overflow-hidden bg-[#1D1D1D]',
        'transition-opacity duration-500 ease-brand',
        phase === 'out' && 'pointer-events-none opacity-0',
      )}
    >
      {/* ファインダーの十字線。画面いっぱいに引き、リングの中心と重ねる */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/7" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/7" />

      <div className="relative flex aspect-square w-[min(380px,80vw)] items-center justify-center rounded-full border border-white/12">
        {/* 間隔を % で置き、画面が狭くなっても二重丸の比率を保つ。
            % はパディングボックス基準なので、380px のとき内円が 309px になる値 */}
        <div className="absolute inset-[8.95%] rounded-full border border-white/8" />
        <div className="absolute inset-[8.95%] animate-ring rounded-full border border-transparent border-t-white/45" />
        <span
          className={cn(
            'relative font-display text-[56px] leading-none tracking-[6px] whitespace-nowrap',
            'transition-opacity duration-500 ease-brand',
            fontReady ? 'opacity-100' : 'opacity-0',
          )}
        >
          LOADING
        </span>
      </div>
    </div>
  );
}

/** 全面に敷くフィルムグレイン */
export function Grain() {
  return <div aria-hidden className="film-grain pointer-events-none fixed inset-0 z-90 opacity-[0.055]" />;
}
