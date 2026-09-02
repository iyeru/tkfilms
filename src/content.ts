import type { SiteContent } from './content.types';

/* =========================================================================
   サイトに表示される文言・作品リスト・連絡先はすべてここにある。
   素材を差し替えるときは、このファイルだけ編集すればよい。
   コンポーネントや CSS を触る必要はない。
   ※ 現在の値はすべて仮素材。詳細は README.md を参照。
   ========================================================================= */

export const content: SiteContent = {
  /* ---- サイト全体 -------------------------------------------------- */
  brand: {
    name: 'TKfilms',
    role: 'Filmmaker',
  },

  /* ---- ナビゲーション（id はセクションと対応） ---------------------- */
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  dots: [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  /* ---- 1. Hero ------------------------------------------------------ */
  hero: {
    eyebrow: 'Marketer & Filmmaker',
    title: 'TKfilms',
    meta: 'TOKYO — SINCE 2026',
    // 宣材動画（work/宣材動画/top.mp4）。上下の黒帯は Hero 側で画面外へ送っている
    videoSrc: 'media/hero.mp4',
    youtubeId: null,
    // 動画が出るまで敷く1枚。上の動画の 2.5 秒地点を黒帯だけ落として書き出したもの
    poster: 'images/hero-poster.jpg',
  },

  /* ---- 2. Works ----------------------------------------------------- */
  works: {
    heading: 'Works',
    // 掲載許可を得た実案件。ロゴと動画は work/logo・work/宣材動画 の支給素材から起こしている
    feature: {
      title: 'Hana to Hana',
      videoSrc: 'media/hana-to-hana.mp4',
      youtubeId: null,
      // 上の動画の20秒地点（岩の露天風呂の空撮）。暗幕をかけても潰れない画を選んでいる
      poster: 'images/hana-to-hana-poster.jpg',
      client: {
        label: 'Client',
        name: '日光国立公園 湯西川温泉 彩り湯かしき 花と華',
        // 支給ロゴは白地・黒文字。暗い地に置くため白を透過に抜き、紫の花マークだけ元の色で残している
        logo: 'images/hana-to-hana-logo.png',
      },
    },
  },

  /* ---- 2-b. Portfolio -------------------------------------------------
     work/宣材動画 にある6本（hana_to_hana・top を除く）。
     すべて YouTube 限定公開にアップロードしてから youtubeId を入れる。
     アップロードが済むまでは null のままにして「準備中」の枠だけ出す。
     並びは wide（全幅1本）が連続しないように挟んである。
  ------------------------------------------------------------------- */
  portfolio: {
    heading: 'Portfolio',
    items: [
      { title: 'Our College Life', youtubeId: 'JcBG3r89qvg', wide: true },
      { title: 'City to Local', youtubeId: 'aEfg2ORTbng', wide: false },
      { title: 'Wedding Movie', youtubeId: 'LLJc4rKrKeM', wide: false },
      { title: 'Biwako & Tateiwa GR Yaris', youtubeId: 'qEOLHjdW97I', wide: true },
      { title: 'Hokkaido', youtubeId: 'EFEttjws1S0', wide: false },
      { title: 'Gifu Trip', youtubeId: 'g_trL3ic36E', wide: false },
    ],
  },

  /* ---- 3. About ----------------------------------------------------- */
  about: {
    heading: 'About',
    // 1人目は写真が右、2人目は左。Section 側が並び順から自動で振り分ける
    blocks: [
      {
        // 本文・実績は work/過去_提案資料 の自己紹介欄の文言をそのまま使っている
        body: [
          '高本 壮基 / Takamoto Soki。同志社大学卒業後、金融機関に入社(現職)。同社での本業では、大手から中小企業、地方自治体の営業や、キャッシュレスデータを活用した観光分析・集客支援、マーケティング企画開発に従事。',
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
        portrait: 'images/takamoto.jpg',
      },
      {
        body: [
          '阪井 慎太郎 / Sakai Shintaro。ソフトウェアエンジニアとして5年、要件定義から設計・実装・リリースまでを一貫して担当。フロントエンド・バックエンド・クラウドに加え、開発チームのマネジメントに従事。',
          '副業では、中小・地方事業の課題を映像とWebの両面から解決することを目指し、高本と組んで活動。',
        ],
        credits: {
          heading: 'Web・技術実績',
          items: [
            '本業にて、要件定義から設計・実装・リリースまでを5年間一貫して担当。フロントエンド / バックエンド / クラウドおよびマネジメントを経験',
            '当サイト（tkfilms.jp）の設計・実装・公開・運用を担当',
            '日光の温泉宿PV撮影に、撮影アシスタントとして参加',
            'Adobe Premiere Pro での動画編集・写真加工（1分程度の制作経験）',
          ],
        },
        meta: [
          { label: 'Base', value: '東京' },
          { label: 'Main', value: 'ソフトウェアエンジニア' },
          { label: 'Sub', value: 'Web実装 / 撮影アシスタント' },
          { label: 'Stack', value: 'フロントエンド / バックエンド / クラウド' },
          { label: 'Edit', value: 'Adobe Premiere Pro' },
        ],
        // 顔写真は未撮影。撮り次第 images/ に差し替える
        portrait: null,
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
    sendingLabel: 'Sending',
    sentLabel: 'Thank you',
    // [ 仮 — テスト用フォーム。本番のエンドポイントに差し替える（docs/todo.md 項目8）]
    // 手順は docs/formspree-setup.md。null にすると送信されず必ず失敗が出る。
    endpoint: 'https://formspree.io/f/meaqglje',
    // 送信に失敗したときの逃げ道。実アドレスが決まったら入れる（docs/todo.md）
    fallbackEmail: null,
    messages: {
      sent: 'お問い合わせを受け付けました。2営業日以内にご返信します。',
      error: '送信できませんでした。お手数ですが、時間をおいてもう一度お試しください。',
    },
  },

  /* ---- Instagram 風グリッド ------------------------------------------ */
  gram: [
    { src: 'images/gram-hk-temple.jpg', scope: false },
    { src: 'images/gram-hilltop-sunset.jpg', scope: false },
    { src: 'images/gram-hk-lions-head.jpg', scope: false },
    { src: 'images/gram-lions-head-girl.jpg', scope: false },
    { src: 'images/gram-nordic-town.jpg', scope: false },
    { src: 'images/gram-hk-night-view.jpg', scope: false },
  ],

  /* ---- フッター ------------------------------------------------------ */
  footer: {
    copyright: '© 2026 TKfilms — All rights reserved.',
  },
};
