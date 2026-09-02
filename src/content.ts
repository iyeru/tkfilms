import type { SiteContent } from './content.types';

/* =========================================================================
   サイトに表示される文言・作品リスト・連絡先はすべてここにある。
   素材を差し替えるときは、このファイルだけ編集すればよい。
   コンポーネントや CSS を触る必要はない。
   ※ 現在の値はすべて仮素材。詳細は README.md を参照。
   ========================================================================= */

/** YouTube が書き出すサムネイル。n は動画中盤のキャプチャ番号（1〜3） */
const frame = (id: string, n: 1 | 2 | 3) => `https://i.ytimg.com/vi/${id}/maxres${n}.jpg`;

export const content: SiteContent = {
  /* ---- サイト全体 -------------------------------------------------- */
  brand: {
    name: 'Studio Kairo',
    role: 'Filmmaker',
  },

  /* ---- ナビゲーション（id はセクションと対応） ---------------------- */
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  dots: [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  /* ---- 1. Hero ------------------------------------------------------ */
  hero: {
    eyebrow: 'Marketer & Filmmaker',
    title: 'Studio Kairo',
    meta: 'TOKYO — SINCE 2016',
    youtubeId: 'V-qTEo9IHTA',
    poster: frame('V-qTEo9IHTA', 2),
    mediaNote: '[ 仮素材 — 本番は showreel.mp4 に差し替え ]',
  },

  /* ---- 2. Works ----------------------------------------------------- */
  works: {
    heading: 'Works',
    feature: {
      category: 'Brand Film',
      title: 'The Long Light',
      youtubeId: 'AwGjc8Yz8fc',
      poster: frame('AwGjc8Yz8fc', 2),
      slides: 5,
    },
    // 並びはシネスコ（全幅）が2本続かないよう挟んである
    items: [
      {
        title: 'Aoyama Coffee Works',
        youtubeId: 'DhVz3xsAis0',
        thumb: frame('DhVz3xsAis0', 2),
        ratio: '16/9',
        ratioLabel: '16:9',
      },
      {
        // maxres2/3 は実在企業の船体ロゴが読めてしまう。遠景の 1 を使う
        title: 'Setouchi Ferry',
        youtubeId: '0hpkWLJzYQs',
        thumb: frame('0hpkWLJzYQs', 1),
        ratio: '16/9',
        ratioLabel: '16:9',
      },
      {
        title: 'Wedding / M & S',
        youtubeId: 'UyBsm2wU8ag',
        thumb: frame('UyBsm2wU8ag', 2),
        ratio: '2.39/1',
        ratioLabel: '2.39:1',
      },
      {
        title: 'Kiso Woodwork',
        youtubeId: 'tSmyaP5QfeM',
        thumb: frame('tSmyaP5QfeM', 2),
        ratio: '16/9',
        ratioLabel: '16:9',
      },
      {
        title: 'Nightwalk / MV',
        youtubeId: 'FfBE5_gqTSY',
        thumb: frame('FfBE5_gqTSY', 2),
        ratio: '16/9',
        ratioLabel: '16:9',
      },
      {
        title: 'Sanriku Divers',
        youtubeId: '4hs_GGss_Nc',
        thumb: frame('4hs_GGss_Nc', 2),
        ratio: '2.39/1',
        ratioLabel: '2.39:1',
      },
    ],
    moreLabel: 'View more',
  },

  /* ---- 3. About ----------------------------------------------------- */
  about: {
    heading: 'About',
    // 1人目は写真が右、2人目は左。Section 側が並び順から自動で振り分ける
    blocks: [
      {
        // 本文・実績は work/過去_提案資料 の自己紹介欄の文言をそのまま使っている
        body: [
          '高本 壮基 / Takamoto Soki。同志社大学卒業後、三井住友カード株式会社に入社(現職)。同社での本業では、大手から中小企業、地方自治体の営業や、キャッシュレスデータを活用した観光分析・集客支援、マーケティング企画開発に従事。',
          '副業では、本業の知見を活かしたマーケティング支援、映像企画・撮影・編集を行う個人事業主として活動。',
        ],
        credits: {
          heading: '観光集客・動画実績',
          items: [
            '本業にて、地方都道府県及び民間企業の観光分析・施策立案、大手人材会社連携の淡路島誘客施策など、自治体 / 企業様向けのデータ送客設計を多数担当',
            '副業にてチャンネル登録者数約3,000人の工務店YouTube編集、挙式ムービー制作等',
            '撮影機材、編集ソフト共に業務基準の仕様',
            'ドローン操縦歴約6年、挙式ムービーでの撮影実績もあり',
          ],
        },
        meta: [
          { label: 'Base', value: '東京' },
          { label: 'Main', value: '金融機関マーケター' },
          { label: 'Sub', value: 'マーケティング映像クリエイター' },
          { label: 'Camera', value: 'Sony α7C / DJIドローン / ジンバル' },
          { label: 'Edit', value: 'Adobe Premiere Pro' },
        ],
        portrait: frame('tSmyaP5QfeM', 1),
      },
      {
        body: [
          '[ 仮素材 ] 遠藤 蒼 / Ao Endo。プロデューサー / 編集。企画立案から予算管理、撮影のロジスティクスまでを担当。高本とともに制作全体を組み立てる。',
          'Producer / Editor. Handles planning, budgeting and on-set logistics, building the production alongside Takamoto from the ground up.',
        ],
        meta: [
          { label: 'Role', value: 'Producer / Editor' },
          { label: 'Since', value: '2018' },
          { label: 'Field', value: 'Production / Post' },
        ],
        portrait: frame('DhVz3xsAis0', 1),
      },
    ],
  },

  /* ---- 4. Equipment -------------------------------------------------- */
  equipment: {
    heading: 'Equipment',
    items: [
      { brand: 'DJI', model: 'Mini 4 Pro' },
      { brand: 'Sony', model: 'α7C' },
      { brand: 'Adobe', model: 'Premiere Pro' },
    ],
  },

  /* ---- 5. Contact ---------------------------------------------------- */
  contact: {
    heading: 'Contact',
    lead: '撮影のご相談・お見積りはこちらから。2営業日以内にご返信します。',
    fields: { name: 'Your Name', email: 'Your Email', subject: 'Subject', message: 'Message' },
    sendLabel: 'Send',
    sentLabel: 'Thank you',
  },

  /* ---- Instagram 風グリッド ------------------------------------------ */
  gram: [
    { src: frame('V-qTEo9IHTA', 1), scope: false },
    { src: frame('DhVz3xsAis0', 3), scope: false },
    { src: frame('0hpkWLJzYQs', 1), scope: false },
    { src: frame('FfBE5_gqTSY', 3), scope: false },
    { src: frame('UyBsm2wU8ag', 3), scope: true },
    { src: frame('4hs_GGss_Nc', 2), scope: true },
  ],

  /* ---- フッター ------------------------------------------------------ */
  footer: {
    copyright: '© 2026 Studio Kairo — All rights reserved.',
  },
};
