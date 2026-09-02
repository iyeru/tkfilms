export type HoverTarget = {
  key: string;
  label: string;
  /** 表示させるためスクロールするセクションid */
  scrollId: string;
  selector: string;
};

// ホバーで見た目が変わる要素を一覧化している。通常のテストはトランジションを
// 無効化していて :hover を再現しないため、ここに足したものだけが検証される。
//
// かつてフッターのSNSアイコン（Instagram）を対象にしていたが、フッターから
// リンクが無くなっておりテスト定義だけが残っていたため削除した。
// フッターにリンクを戻したらここにも足すこと。
export const hoverTargets: HoverTarget[] = [
  {
    key: 'nav-works',
    label: 'ヘッダー: Works リンク',
    scrollId: 'home',
    selector: 'header nav a[href="#works"]',
  },
  {
    key: 'nav-contact',
    label: 'ヘッダー: Contact リンク',
    scrollId: 'home',
    selector: 'header nav a[href="#contact"]',
  },
  {
    key: 'works-slider-prev',
    label: 'works: スライダー前へボタン',
    scrollId: 'works',
    selector: '#works button[aria-label="前の作品"]',
  },
  {
    key: 'works-slider-next',
    label: 'works: スライダー次へボタン',
    scrollId: 'works',
    selector: '#works button[aria-label="次の作品"]',
  },
  {
    key: 'works-card',
    label: 'works: 作品カード',
    scrollId: 'works',
    // 代表作スライダーには付かない .group でカードだけに絞り込む
    selector: '#works .group',
  },
  {
    key: 'works-view-more',
    label: 'works: View more ボタン',
    scrollId: 'works',
    selector: '#works a:has-text("View more")',
  },
  {
    key: 'back-to-top',
    label: 'Back to top ボタン',
    scrollId: 'contact',
    selector: 'button:has-text("↑")',
  },
];
