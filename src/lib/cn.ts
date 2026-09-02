/** クラス名を連結する。false / null / undefined は捨てる */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * public/ に置いたファイルへのURLを作る。
 * 配信先の base を必ず前に付ける（ルート配信なら実質そのまま）。
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

/**
 * content.ts に書かれた画像・動画の指定を、そのまま src に入れられるURLにする。
 * `http(s)://` で始まるものは外部のURL、それ以外は `public/` に置いたファイル名として扱う。
 */
export function mediaUrl(src: string): string {
  return /^https?:\/\//.test(src) ? src : asset(src);
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
