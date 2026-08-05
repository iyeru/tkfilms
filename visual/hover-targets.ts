export type HoverTarget = {
  key: string;
  label: string;
  /** 表示させるためスクロールするセクションid（design/react で共通のIDを使う） */
  scrollId: string;
  designSelector: string;
  /** src/ 側にまだ無ければ null（テストは自動でskip） */
  reactSelector: string | null;
};

// design/ の style-hover 属性に対応するホバー状態を比較する。
// react 側は aria-label を日本語にしている（メニュー・ページ先頭へ戻る等と同じ方針）ため、
// ラベルで引く箇所は design/react でセレクタが異なる。
export const hoverTargets: HoverTarget[] = [
  {
    key: 'nav-works',
    label: 'ヘッダー: Works リンク',
    scrollId: 'home',
    designSelector: 'header nav a[href="#works"]',
    reactSelector: 'header nav a[href="#works"]',
  },
  {
    key: 'nav-contact',
    label: 'ヘッダー: Contact リンク',
    scrollId: 'home',
    designSelector: 'header nav a[href="#contact"]',
    reactSelector: 'header nav a[href="#contact"]',
  },
  {
    key: 'works-slider-prev',
    label: 'works: スライダー前へボタン',
    scrollId: 'works',
    designSelector: '#works button[aria-label="Previous"]',
    reactSelector: '#works button[aria-label="前の作品"]',
  },
  {
    key: 'works-slider-next',
    label: 'works: スライダー次へボタン',
    scrollId: 'works',
    designSelector: '#works button[aria-label="Next"]',
    reactSelector: '#works button[aria-label="次の作品"]',
  },
  {
    key: 'works-card',
    label: 'works: 作品カード',
    scrollId: 'works',
    // 一部のカードは実際のYouTube埋め込みに差し替わっており(:not(iframe)で除外)、
    // freeze CSSでiframeをvisibility:hiddenにしているためhoverできない
    designSelector: '#works [style*="16 / 9"]:not(iframe)',
    // 代表作スライダーには付かない .group でカードだけに絞り込む
    reactSelector: '#works .group',
  },
  {
    key: 'works-view-more',
    label: 'works: View more ボタン',
    scrollId: 'works',
    designSelector: '#works a:has-text("View more")',
    reactSelector: '#works a:has-text("View more")',
  },
  {
    key: 'footer-sns',
    label: 'フッター: SNSアイコン（Instagram）',
    scrollId: 'contact',
    designSelector: 'a[aria-label="Instagram"]',
    reactSelector: 'a[aria-label="Instagram"]',
  },
  {
    key: 'back-to-top',
    label: 'Back to top ボタン',
    scrollId: 'contact',
    designSelector: 'button:has-text("↑")',
    reactSelector: 'button:has-text("↑")',
  },
];
