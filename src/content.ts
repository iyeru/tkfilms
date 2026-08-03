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
    name: 'TKFILMS',
    role: 'Videographer',
  },

  /* ---- ナビゲーション（id はセクションと対応） ---------------------- */
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'profile', label: 'Profile' },
    { id: 'service', label: 'Service' },
    { id: 'contact', label: 'Contact' },
  ],

  /* ---- 1. Hero ------------------------------------------------------ */
  hero: {
    eyebrow: 'Videographer',
    title: 'TKFILMS',
    copy: '記録ではなく、記憶に残る映像を。',
    // 背景を差し替えるとき: { type: 'video', src: 'movie.mp4', poster: 'poster.jpg' }
    //                    または { type: 'image', src: 'hero.jpg' }
    // ファイルは public/ に置く
    media: null,
    mediaNote: '[ showreel — 素材差し替え予定 ]',
  },

  /* ---- 2. Works ----------------------------------------------------- */
  works: {
    heading: 'Works',
    lead: '企画・撮影・編集・カラーグレーディングまで一貫して制作しています。',
    // 代表作が増えたら配列に追加する（スライダーの矢印・dotは件数に自動で追従する）
    featured: [{ category: 'Brand Film', title: '[ 代表作 — 差し替え予定 ]' }],
    // youtubeId に動画IDを入れると埋め込みに変わる（null のあいだはプレースホルダ表示）
    items: [
      { title: '[ 作品タイトル 01 ]', category: 'Brand Movie', youtubeId: null },
      { title: '[ 作品タイトル 02 ]', category: 'Event', youtubeId: null },
      { title: '[ 作品タイトル 03 ]', category: 'Wedding', youtubeId: null },
      { title: '[ 作品タイトル 04 ]', category: 'SNS Movie', youtubeId: null },
      { title: '[ 作品タイトル 05 ]', category: 'Brand Movie', youtubeId: null },
      { title: '[ 作品タイトル 06 ]', category: 'Documentary', youtubeId: null },
    ],
  },

  /* ---- 3. Profile --------------------------------------------------- */
  profile: {
    heading: 'Profile',
    portrait: null, // 'portrait.jpg' のように指定すると写真に変わる（public/ に置く）
    portraitNote: '[ portrait — 4:5 ]',
    body: [
      '[ 自己紹介文をここに入れる ] 映像制作を手がけています。企画の相談から撮影・編集まで、少人数で最後まで担当します。',
      '[ 撮影に対するスタンスをここに入れる ] 段取りよりも、その場でしか撮れない表情や間合いを大切にしています。',
    ],
    meta: [
      { label: 'Base', value: '[ 拠点 ]' },
      { label: 'Since', value: '[ 開始年 ]' },
      { label: 'Field', value: 'Brand / Event / Wedding' },
    ],
  },

  /* ---- 4. Service / Price ------------------------------------------- */
  service: {
    heading: 'Service',
    lead: '撮影内容・尺・納期に応じてお見積りします。まずはご相談ください。',
    // price は決まったら '¥180,000' のように差し替える
    plans: [
      { tag: 'Plan A', title: 'Short Movie', desc: '30〜60秒 / 撮影半日 / 1カメ', price: '要相談' },
      { tag: 'Plan B', title: 'Brand Movie', desc: '2〜3分 / 撮影1日 / 2カメ', price: '要相談' },
      { tag: 'Plan C', title: 'Event', desc: 'イベント記録・ダイジェスト', price: '要相談' },
    ],
    flow: [
      { no: '01', title: 'Hearing', text: '目的と使い道をうかがい、尺と構成の方向性を決めます。' },
      { no: '02', title: 'Shooting', text: '現場の空気を壊さないよう、少人数で撮影します。' },
      { no: '03', title: 'Delivery', text: '編集・グレーディングを経て、用途に合わせた形で納品します。' },
    ],
    notes: [
      '[ 補足事項をここに入れる ] 企画構成のご相談を含みます',
      '[ 補足事項をここに入れる ] SNS向けの縦型リサイズにも対応します',
      '[ 補足事項をここに入れる ] 交通費は実費でご相談させてください',
    ],
  },

  /* ---- 5. Contact ---------------------------------------------------- */
  contact: {
    heading: 'Contact',
    lead: '撮影のご相談・お見積りはこちらから。',
    // href を実際の連絡先に差し替える。使わない導線は行ごと削除してよい
    links: [
      { label: 'Instagram DM', href: '#' },
      { label: 'Email', href: '#' },
    ],
    note: '[ 返信の目安などをここに入れる ]',
  },

  /* ---- フッター ------------------------------------------------------ */
  footer: {
    sns: [
      { label: 'IG', href: '#', name: 'Instagram' },
      { label: 'YT', href: '#', name: 'YouTube' },
    ],
    copyright: '© 2026 TKFILMS',
  },
};
