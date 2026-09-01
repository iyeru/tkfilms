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
  /** design/ 側のセレクタ（原本が正） */
  designSelector: string;
  /** src/ 側のセレクタ。まだ実装がなければ null（テストは自動でskipされる） */
  reactSelector: string | null;
};

// design/ が id を振っているのは home/works/about/contact の4つだけで、
// Equipment・Gram・Footer には id が無い（原本を直接編集して id を足しても、
// 書き出し直しで消えるので当てにできない）。そのため id 決め打ちではなく、
// 両側で同じ形になる構造セレクタで指している。
// セクションを作ったらここの reactSelector を埋めるだけでテスト対象になる。
export const sections: SectionDef[] = [
  {
    key: 'home',
    label: 'Hero',
    designSelector: '#home',
    reactSelector: '#home',
  },
  {
    key: 'works',
    label: 'Works',
    designSelector: '#works',
    reactSelector: '#works',
  },
  {
    key: 'about',
    label: 'About',
    designSelector: '#about',
    reactSelector: '#about',
  },
  {
    key: 'equipment',
    label: 'Equipment',
    // 見出しで引く。セクションは入れ子にならないので :has() でも取り違えない
    designSelector: 'section:has(h2:text-is("Equipment"))',
    reactSelector: 'section:has(h2:text-is("Equipment"))',
  },
  {
    key: 'contact',
    label: 'Contact',
    designSelector: '#contact',
    reactSelector: '#contact',
  },
  {
    key: 'gram',
    label: 'Gram（正方形グリッド）',
    // 見出しも id も持たないタイルだけのセクション。contact の直後という位置で引くしかない
    designSelector: '#contact + section',
    reactSelector: '#contact + section',
  },
  {
    key: 'footer',
    label: 'Footer',
    designSelector: 'footer',
    reactSelector: 'footer',
  },
];
