export type HoverTarget = {
  key: string;
  label: string;
  /** 表示させるためスクロールするセクションid（design/react で共通のIDを使う） */
  scrollId: string;
  designSelector: string;
  /** src/ 側にまだ無ければ null（テストは自動でskip） */
  reactSelector: string | null;
};

// design/ の style-hover 属性のうち、src/ に実装済みのセクション（home/works/profile/
// service/contact + 共通のヘッダー・フッター）に対応するものだけを対象にする。
// about/price などまだ無いセクションのホバーは対象外（visual/sections.ts の reactId: null と同じ理由）。
export const hoverTargets: HoverTarget[] = [
  {
    key: 'nav-works',
    label: 'ヘッダー: Works リンク',
    scrollId: 'home',
    designSelector: 'header nav a[href="#works"]',
    reactSelector: 'header nav a[href="#works"]',
  },
  {
    key: 'nav-profile',
    label: 'ヘッダー: Profile リンク',
    scrollId: 'home',
    designSelector: 'header nav a[href="#profile"]',
    reactSelector: 'header nav a[href="#profile"]',
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
    reactSelector: '#works button[aria-label="Previous"]',
  },
  {
    key: 'works-slider-next',
    label: 'works: スライダー次へボタン',
    scrollId: 'works',
    designSelector: '#works button[aria-label="Next"]',
    reactSelector: '#works button[aria-label="Next"]',
  },
  {
    key: 'works-card',
    label: 'works: 作品カード',
    scrollId: 'works',
    designSelector: '#works [style*="16 / 9"]',
    // FeaturedSlider にも同じ .hatch（斜線プレースホルダー）クラスを使っているため、
    // カードにしか付かない .group で絞り込む
    reactSelector: '#works .group.hatch',
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
