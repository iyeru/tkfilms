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
    eyebrow: 'Filmmaker & Cinematographer',
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
    // 顔写真はまだ仮素材。ブロックを増やすと写真の左右が自動で交互になる
    blocks: [
      {
        body: [
          '高本 壮基 / Takamoto Soki。金融機関でマーケター / データビジネスプランナーとして働きながら、映像制作を行う個人事業主です。本業では大手企業から中小企業、地方自治体までを対象に、キャッシュレスデータを使った観光分析・集客支援とマーケティング企画開発に従事しています。',
          '副業では、その知見をそのまま映像に持ち込みます。旅館・ホテルのPR映像、チャンネル登録者数約3,000人の工務店 YouTube 編集、挙式ムービーなどを企画から撮影・編集まで一貫して担当。「誰に、何を、どう届けるか」を先に設計してから、カメラを構えます。',
          'Marketer and data business planner by day, filmmaker by night. Brand films for ryokan, hotels and local businesses — planned, shot and cut by one pair of hands, starting from who the film is for rather than from the camera.',
        ],
        meta: [
          { label: 'Base', value: '[ 拠点 ]' },
          { label: 'Main', value: '金融機関マーケター' },
          { label: 'Sub', value: '映像企画 / 撮影 / 編集' },
          { label: 'Drone', value: '操縦歴 約6年' },
        ],
        portrait: frame('tSmyaP5QfeM', 1),
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
