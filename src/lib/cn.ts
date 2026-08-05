/** クラス名を連結する。false / null / undefined は捨てる */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * public/ に置いたファイルへのURLを作る。
 * GitHub Pages では /tkfilms/ 配下で配信されるため、base を必ず前に付ける。
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

/**
 * 背景で無音ループさせる用の YouTube 埋め込みURL。
 * 操作要素をすべて外し、単体の動画を playlist に指定してループさせる。
 */
export function bgVideoSrc(id: string, start?: number): string {
  const params = [
    'autoplay=1',
    'mute=1',
    'loop=1',
    `playlist=${id}`,
    'controls=0',
    'modestbranding=1',
    'rel=0',
    'playsinline=1',
    'disablekb=1',
    'fs=0',
    'iv_load_policy=3',
  ];
  if (start != null) params.push(`start=${start}`);
  return `https://www.youtube-nocookie.com/embed/${id}?${params.join('&')}`;
}

/** クリックで再生できる通常の埋め込みURL */
export function playerSrc(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
}
