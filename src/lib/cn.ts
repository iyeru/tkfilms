/** クラス名を連結する。false / null / undefined は捨てる */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** 外部リンクなら別タブで開くための属性を返す */
export function externalLinkProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {};
}

/**
 * public/ に置いたファイルへのURLを作る。
 * GitHub Pages では /tkfilms/ 配下で配信されるため、base を必ず前に付ける。
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
