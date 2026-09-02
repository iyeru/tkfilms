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
  /**
   * 背景で流す動画ファイル（`public/` に置いたファイル名）。
   * 入っていれば youtubeId より優先する。null なら YouTube か静止画になる。
   */
  videoSrc: string | null;
  /** 背景で流す YouTube の動画ID。null なら静止画のみ */
  youtubeId: string | null;
  /** 動画が始まるまで下に敷くサムネイル。`public/` のファイル名か外部URL */
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

/** 制作を請けた相手。ロゴは代表作の真下にクレジットとして出る */
export type WorkClient = {
  /** ロゴ画像。`public/` に置いたファイル名か外部URL。暗い地に置くので白抜き版を使う */
  logo: string;
  /** ロゴの代替テキスト。読み上げと、画像が出ないときの表示に使う */
  name: string;
  /** ロゴの左に添える小さなラベル */
  label: string;
};

/**
 * Works の先頭で1本を大きく見せる枠。
 * 背景の指定は Hero と同じ順番で効く（videoSrc → youtubeId → poster の1枚）。
 */
export type WorksFeature = {
  /** 作品名。枠の中には出ない。読み上げ用の名前としてだけ使う */
  title: string;
  /** 流す動画ファイル（`public/` に置いたファイル名）。入っていれば youtubeId より優先する */
  videoSrc: string | null;
  /** 流す YouTube の動画ID。null なら poster の1枚だけになる */
  youtubeId: string | null;
  /** 再生が始まるまで下に敷く1枚。`public/` のファイル名か外部URL */
  poster: string;
  /** 発注元。null ならクレジット行ごと出ない */
  client: WorkClient | null;
};

export type Works = {
  heading: string;
  feature: WorksFeature;
  items: WorkItem[];
  moreLabel: string;
};

/** About に並ぶ人物1人ぶん。本文・実績・肩書きの表・顔写真を持つ */
export type AboutBlock = {
  body: string[];
  /** 見出し付きの箇条書き。実績のように行を詰めて並べたいときに使う。無ければ省略 */
  credits?: { heading: string; items: string[] };
  meta: { label: string; value: string }[];
  /** 顔写真。`public/` に置いたファイル名か外部URL */
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
