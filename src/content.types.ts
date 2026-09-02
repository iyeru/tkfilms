/**
 * content.ts の形を決める型。
 * ここを直すとエディタの補完と型チェックに反映されるので、
 * 項目を増やしたいときは まずこのファイル、次に content.ts の順で編集する。
 */

/** セクションの識別子。ナビ・サイドドット・スクロール位置の対応付けに使う */
export type SectionId = 'home' | 'works' | 'about' | 'contact';

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

/** About に並ぶ人物1人ぶん。本文・実績・肩書きの表・顔写真を持つ */
export type AboutBlock = {
  body: string[];
  /** 見出し付きの箇条書き。実績のように行を詰めて並べたいときに使う。無ければ省略 */
  credits?: { heading: string; items: string[] };
  meta: { label: string; value: string }[];
  portrait: string;
};

export type About = {
  heading: string;
  /** 上から順に並ぶ。写真の左右は自動で交互になる */
  blocks: AboutBlock[];
};

export type Equipment = {
  heading: string;
  /** brand は Six Caps で大きく、model は等幅・寒色で添える */
  items: { brand: string; model: string }[];
};

export type Contact = {
  heading: string;
  lead: string;
  fields: { name: string; email: string; subject: string; message: string };
  sendLabel: string;
  /** 送信中のボタン表記 */
  sendingLabel: string;
  sentLabel: string;
  /**
   * 送信先。Formspree のエンドポイント（`https://formspree.io/f/xxxxxxxx`）。
   * 登録の手順は docs/formspree-setup.md。
   *
   * `null` のあいだは送信せず、必ず失敗として表示する。ここを空にしたまま
   * 「成功したふり」をさせない（それが直前まで起きていた不具合そのもの）。
   */
  endpoint: string | null;
  /** 送信に失敗したときに案内するメールアドレス。null なら案内を出さない */
  fallbackEmail: string | null;
  /** 送信後に出す文言 */
  messages: { sent: string; error: string };
};

export type Footer = {
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
  about: About;
  equipment: Equipment;
  contact: Contact;
  /** Instagram 風の正方形グリッド */
  gram: { src: string; scope: boolean }[];
  footer: Footer;
};
