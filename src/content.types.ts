/**
 * content.ts の形を決める型。
 * ここを直すとエディタの補完と型チェックに反映されるので、
 * 項目を増やしたいときは まずこのファイル、次に content.ts の順で編集する。
 */

/** セクションの識別子。ナビ・サイドドット・スクロール位置の対応付けに使う */
export type SectionId = 'home' | 'works' | 'profile' | 'service' | 'contact';

export type NavItem = {
  id: SectionId;
  label: string;
};

/** Hero の背景。null のあいだは斜線のプレースホルダが出る */
export type HeroMedia =
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string };

export type Brand = {
  /** ロゴ・フッターに出る表記 */
  name: string;
  /** 肩書き（英字） */
  role: string;
};

export type Hero = {
  eyebrow: string;
  title: string;
  copy?: string;
  media: HeroMedia | null;
  /** media が null のときだけ左下に出る注記 */
  mediaNote?: string;
};

export type WorkItem = {
  title: string;
  category: string;
  /** YouTube の動画ID。入れると埋め込みプレイヤーに変わる */
  youtubeId: string | null;
};

export type Works = {
  heading: string;
  lead?: string;
  items: WorkItem[];
};

export type Profile = {
  heading: string;
  /** 'portrait.jpg' のように指定すると写真に変わる */
  portrait: string | null;
  portraitNote?: string;
  body: string[];
  meta: { label: string; value: string }[];
};

export type Plan = {
  tag: string;
  title: string;
  desc: string;
  price: string;
  /** 価格の後ろに小さく添える単位。不要なら空文字 */
  unit?: string;
};

export type Service = {
  heading: string;
  lead?: string;
  plans: Plan[];
  flow: { no: string; title: string; text: string }[];
  notes: string[];
};

export type Contact = {
  heading: string;
  lead?: string;
  links: { label: string; href: string }[];
  note?: string;
};

export type Footer = {
  sns: { label: string; href: string; name: string }[];
  copyright: string;
};

export type SiteContent = {
  brand: Brand;
  nav: NavItem[];
  hero: Hero;
  works: Works;
  profile: Profile;
  service: Service;
  contact: Contact;
  footer: Footer;
};
