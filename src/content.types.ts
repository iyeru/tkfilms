/**
 * content.ts の形を決める型。
 * ここを直すとエディタの補完と型チェックに反映されるので、
 * 項目を増やしたいときは まずこのファイル、次に content.ts の順で編集する。
 */

/** セクションの識別子。ナビ・サイドドット・スクロール位置の対応付けに使う */
export type SectionId = 'home' | 'works' | 'profile' | 'about' | 'price' | 'contact';

export type NavItem = {
  id: SectionId;
  label: string;
};

export type Brand = {
  /** ロゴ・フッターに出る表記 */
  name: string;
  /** 肩書き（英字） */
  role: string;
};

export type Hero = {
  eyebrow: string;
  title: string;
  /** 見出し下に等幅で添える所在と稼働年 */
  meta: string;
  /** 背景で流す YouTube の動画ID。null なら静止画のみ */
  youtubeId: string | null;
  /** 動画が始まるまで下に敷くサムネイル */
  poster: string;
  /** 仮素材であることを示す左下の注記 */
  mediaNote?: string;
};

export type Credit = { label: string; value: string };

/** 撮られた画角。Works はこれをそのまま枠の比率に使う */
export type Ratio = '16/9' | '2.39/1';

export type WorkItem = {
  title: string;
  youtubeId: string;
  /** カードに敷くサムネイル */
  thumb: string;
  ratio: Ratio;
  /** 比率タグの表示 */
  ratioLabel: string;
};

export type Works = {
  heading: string;
  /** 上部のスライダー。1本を大きく見せる */
  feature: { category: string; title: string; youtubeId: string; poster: string; slides: number };
  items: WorkItem[];
  moreLabel: string;
};

export type Profile = {
  heading: string;
  /** 全幅のスライダー。黒帯の入るシネスコ素材と、ロゴが写り込むカットは使わない */
  slides: string[];
};

export type About = {
  heading: string;
  body: string[];
  meta: { label: string; value: string }[];
  portrait: string;
};

export type PriceCta = {
  heading: string;
  lead: string;
  label: string;
};

export type Plan = {
  tag: string;
  title: string;
  desc: string;
  price: string;
  /** 価格の後ろに小さく添える単位 */
  unit: string;
};

export type PricePage = {
  heading: string;
  lead: string;
  /** キービジュアル。3:1 と横長なのでシネスコ素材でも cover だけで黒帯が枠外に落ちる */
  keyVisual: string;
  plansHeading: string;
  plans: Plan[];
  specHeading: string;
  /** スペック欄の横に置くサンプル映像 */
  specYoutubeId: string;
  spec: Credit[];
  optionsHeading: string;
  options: { label: string; body: string }[];
  flow: { no: string; title: string; text: string }[];
  notes: string[];
  backLabel: string;
};

export type Contact = {
  heading: string;
  lead: string;
  fields: { name: string; email: string; subject: string; message: string };
  sendLabel: string;
  sentLabel: string;
};

export type Footer = {
  sns: { label: string; href: string; name: string }[];
  copyright: string;
};

export type SiteContent = {
  brand: Brand;
  /** ヘッダーのナビ。Home は含めない */
  nav: NavItem[];
  /** サイドドット。Home を含む全セクション */
  dots: NavItem[];
  hero: Hero;
  works: Works;
  profile: Profile;
  about: About;
  priceCta: PriceCta;
  pricePage: PricePage;
  contact: Contact;
  /** Instagram 風の正方形グリッド */
  gram: { src: string; scope: boolean }[];
  /** 架空のロゴ。Credit のダミー取引先と同じ名前で辻褄を合わせている */
  partners: { name: string; kind: string }[];
  partnersNote: string;
  footer: Footer;
};
