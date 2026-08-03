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
    { id: 'works', label: 'Works' },
    { id: 'profile', label: 'Profile' },
    { id: 'about', label: 'About' },
    { id: 'price', label: 'Price' },
    { id: 'contact', label: 'Contact' },
  ],

  dots: [
    { id: 'home', label: 'Home' },
    { id: 'featured', label: 'Featured' },
    { id: 'works', label: 'Works' },
    { id: 'profile', label: 'Profile' },
    { id: 'about', label: 'About' },
    { id: 'price', label: 'Price' },
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

  /* ---- 2. Featured Work --------------------------------------------- */
  featured: {
    heading: 'Featured Work',
    lead: '2025年 / ブランドフィルム「THE LONG LIGHT」— 撮影・編集・カラーグレーディングまで一貫制作',
    youtubeId: 'JfmmA2cU2-k',
    // 1本の作品から抜いたコンタクトシート。連番の並びなので比率は 16:9 に揃える
    stills: [
      { src: frame('AwGjc8Yz8fc', 1), scope: true },
      { src: frame('DhVz3xsAis0', 1), scope: false },
      { src: frame('AwGjc8Yz8fc', 3), scope: true },
    ],
    messageHeading: 'Message',
    message:
      'A film is a record of light that will never happen twice. We shoot the quiet minutes between the ones everybody remembers — the breath before the door opens, the hand that hesitates. That is where a brand actually lives.',
    creditHeading: 'Credit',
    credits: [
      { label: 'Director', value: 'Rei Kanzaki' },
      { label: 'DoP', value: 'Studio Kairo' },
      { label: 'Edit', value: 'Studio Kairo' },
      { label: 'Music', value: 'Haneda Tapes' },
      { label: 'Client', value: 'Aoyama Coffee Works' },
    ],
  },

  /* ---- 3. Works ----------------------------------------------------- */
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

  /* ---- 4. Profile --------------------------------------------------- */
  profile: {
    heading: 'Profile',
    // 枠が全幅で横長のため、黒帯の入るシネスコ素材は使わない。
    // 大きく映るので、他社ロゴや船名が写り込むカットも避けている
    slides: [frame('FfBE5_gqTSY', 1), frame('V-qTEo9IHTA', 1)],
  },

  /* ---- 5. About ----------------------------------------------------- */
  about: {
    heading: 'About',
    body: [
      '神谷 玲 / Rei Kanzaki。東京を拠点に、ブランドフィルム・ドキュメンタリー・ミュージックビデオを手がける映像作家です。企画から撮影、編集、カラーグレーディングまでを少人数のチームで一貫して担当し、被写体との距離が近い現場づくりを大切にしています。',
      'Tokyo-based filmmaker working across brand films, documentary and music video. Ten years of shooting, cutting and grading — a small crew, a quiet set, and one long take more than anyone asked for.',
    ],
    meta: [
      { label: 'Base', value: 'Tokyo, Japan' },
      { label: 'Since', value: '2016' },
      { label: 'Field', value: 'Brand / Doc / MV' },
    ],
    portrait: frame('tSmyaP5QfeM', 1),
  },

  /* ---- 6. Price（トップの導線） ------------------------------------- */
  priceCta: {
    heading: 'Price',
    lead: '撮影内容・尺・納期に応じたプラン一覧と、機材・オプションの詳細はこちらから。',
    label: 'View price',
  },

  /* ---- 6b. Price（別ページ） ---------------------------------------- */
  pricePage: {
    heading: 'Price',
    lead: '料金と撮影プランのご案内 — Plans, gear and options.',
    // このページに埋めているサンプル映像と同じ作品のカット
    keyVisual: frame('4HW_ymYfC2I', 3),
    plansHeading: 'Plans',
    plans: [
      {
        tag: 'Plan A',
        title: 'Short Film',
        desc: '30–60秒 / 撮影半日 / 1カメ',
        price: '¥180,000',
        unit: '〜 / tax ex.',
      },
      {
        tag: 'Plan B',
        title: 'Brand Film',
        desc: '2–3分 / 撮影1日 / 2カメ + 音声',
        price: '¥420,000',
        unit: '〜 / tax ex.',
      },
    ],
    specHeading: 'Spec',
    specYoutubeId: '4HW_ymYfC2I',
    spec: [
      { label: 'Camera', value: 'Full-frame cinema, 4K 10bit' },
      { label: 'Format', value: '16:9 / 2.39:1 / 9:16 vertical' },
      { label: 'Delivery', value: '撮影日より 2〜3週間' },
      { label: 'Revision', value: '2回まで無償' },
    ],
    optionsHeading: 'Options',
    options: [
      {
        label: 'Drone',
        body: 'ドローン空撮（国交省許可取得済み・機体2種）。1フライトあたり ¥40,000〜。天候による予備日の設定を含みます。',
      },
      {
        label: 'Audio',
        body: '外部レコーダーとピンマイク2本による同時録音、ナレーション収録、選曲・整音まで。¥30,000〜。',
      },
      {
        label: 'Grading',
        body: 'ACES ワークフローによるカラーグレーディング。LUT の作成とブランド用プリセットの納品を含みます。¥50,000〜。',
      },
      { label: 'Vertical', body: '9:16 縦型リサイズと字幕焼き込み。1本目は無償、2本目以降 ¥15,000/本。' },
    ],
    flow: [
      { no: '01', title: 'Hearing', text: '目的と視聴環境をうかがい、尺と構成の方向性を決めます。' },
      { no: '02', title: 'Shooting', text: '少人数のチームで、現場の空気を壊さずに撮影します。' },
      { no: '03', title: 'Delivery', text: '編集・グレーディングを経て、各媒体向けの書き出しで納品。' },
    ],
    notes: [
      '企画構成・絵コンテの作成を含みます',
      'ドローン撮影・追加カメラはオプション対応',
      'SNS向け縦型リサイズは1本まで無償',
      '交通費・宿泊費は都内近郊を除き実費',
    ],
    backLabel: 'Back to top page',
  },

  /* ---- 7. Contact ---------------------------------------------------- */
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

  /* ---- パートナー（架空） -------------------------------------------- */
  partners: [
    { name: 'Aoyama Coffee Works', kind: 'Brand Film' },
    { name: 'Kiso Woodwork', kind: 'Documentary' },
    { name: 'Haneda Tapes', kind: 'Music Video' },
  ],
  partnersNote: '[ 仮素材 — 実績が出たら差し替え ]',

  /* ---- フッター ------------------------------------------------------ */
  footer: {
    sns: [
      { label: 'IG', href: '#contact', name: 'Instagram' },
      { label: 'YT', href: '#contact', name: 'YouTube' },
      { label: 'VM', href: '#contact', name: 'Vimeo' },
    ],
    copyright: '© 2026 Studio Kairo — All rights reserved.',
  },
};
