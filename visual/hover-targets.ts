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
//
// Works の代表作スライダー矢印・カード・View more ボタンも同じ理由で削除した。
// 代表作を花と華に差し替えた際、飾りの矢印・ドット・カード一覧・View more を
// 丸ごと外し、1本の映像とクレジット行だけの構成にしたため（src/sections/Works.tsx
// の Feature コンポーネントのコメント参照）。作品を複数並べる形に戻したら、
// 実際に動くボタン・カードとしてここに足し直すこと。
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
    key: 'back-to-top',
    label: 'Back to top ボタン',
    scrollId: 'contact',
    selector: 'button:has-text("↑")',
  },
];
