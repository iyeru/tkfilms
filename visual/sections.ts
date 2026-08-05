export type Viewport = { name: string; width: number; height: number };

export const viewports: Viewport[] = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

export type SectionDef = {
  key: string;
  label: string;
  /** design/ 側のセクション id（原本が正） */
  designId: string;
  /** src/ 側のセクション id。まだ実装がなければ null（テストは自動でskipされる） */
  reactId: string | null;
};

// design/ の7セクションを正とする。src/ 側は現状 home/works/profile/service/contact の5つしかなく
// featured・about・price に対応するセクションがない（README記載の「原本と挙動が食い違っていた」の一因）。
// セクションを作ったらここの reactId を埋めるだけでテスト対象になる。
export const sections: SectionDef[] = [
  { key: 'home', label: 'Hero', designId: 'home', reactId: 'home' },
  { key: 'works', label: 'Works', designId: 'works', reactId: 'works' },
  { key: 'about', label: 'About', designId: 'about', reactId: 'about' },
  { key: 'price', label: 'Price CTA', designId: 'price', reactId: 'price' },
  { key: 'contact', label: 'Contact', designId: 'contact', reactId: 'contact' },
];
