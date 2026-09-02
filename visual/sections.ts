export type Viewport = { name: string; width: number; height: number };

// このサイトの折り返しは duo(760px) と wide(1200px) の2本だけ（src/index.css）。
// mobile は両方の下、desktop は両方の上、tablet はその間を通す。
// tablet の帯は Works が2カラムに割れる一方でヘッダーはハンバーガーのまま、
// サイドドットも出ない組み合わせで、ここでしか確認できない。
export const viewports: Viewport[] = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 900, height: 1200 },
  { name: 'desktop', width: 1440, height: 900 },
];

export type SectionDef = {
  key: string;
  label: string;
  /** 撮影範囲を決めるセレクタ */
  selector: string;
};

// id を持っているのは home/works/about/contact の4つだけで、
// Equipment・Gram・Footer には無い。この構成は design/ 原本から引き継いだもので、
// 原本は書き出し直すと手を入れた分が消えるため id を足せなかった。
// src/ は自分で書いているので id を足してもよいが、足すとページ側の変更になるので
// ここでは構造セレクタのまま扱っている（セレクタが壊れる操作は README を参照）。
export const sections: SectionDef[] = [
  {
    key: 'home',
    label: 'Hero',
    selector: '#home',
  },
  {
    key: 'works',
    label: 'Works',
    selector: '#works',
  },
  {
    key: 'about',
    label: 'About',
    selector: '#about',
  },
  {
    key: 'equipment',
    label: 'Equipment',
    // 見出しで引く。セクションは入れ子にならないので :has() でも取り違えない
    selector: 'section:has(h2:text-is("Equipment"))',
  },
  {
    key: 'contact',
    label: 'Contact',
    selector: '#contact',
  },
  {
    key: 'gram',
    label: 'Gram（正方形グリッド）',
    // 見出しも id も持たないタイルだけのセクション。contact の直後という位置で引くしかない
    selector: '#contact + section',
  },
  {
    key: 'footer',
    label: 'Footer',
    selector: 'footer',
  },
];
