# tkfilms

映像制作の自己紹介サイト。GitHub Pages で公開している。

- 公開URL: https://iyeru.github.io/tkfilms/
- 構成: React + TypeScript + Tailwind CSS v4 + Vite
- 開発の進め方（ブランチ・PR・リリース）: [docs/branch-strategy.md](docs/branch-strategy.md)

## 開発

```bash
npm install
npm run dev        # http://localhost:5173/tkfilms/
```

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバ（保存すると即反映） |
| `npm run build` | 型チェック → `dist/` に本番ビルド |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run typecheck` | 型チェックだけ |

## 公開

`main` に push すると GitHub Actions がビルドして Pages に配信する（1分ほど）。手順は `.github/workflows/deploy.yml`。

> **初回だけ設定が必要**
> リポジトリの Settings → Pages → Build and deployment → Source を **GitHub Actions** に変更する。
> 「Deploy from a branch」のままだとこのワークフローの結果が反映されない。

デプロイの成否は Actions タブで確認できる。

## 構成

```
src/
├── content.ts        # ★ 文言・作品・連絡先。素材差し替えはここだけ
├── content.types.ts  # content.ts の型
├── index.css         # デザイントークン（色・書体・動き）
├── App.tsx           # 全体の組み立て
├── sections/         # Hero / Works / Profile / Service / Contact
├── components/       # ヘッダー・ドロワー・ローダーなど共通部品
├── hooks/            # スクロール・出現アニメーション
└── lib/cn.ts         # クラス名連結・外部リンク判定・public のパス解決
```

外部から読み込んでいるのは **Google Fonts だけ**。

## 素材の差し替え方

`src/content.ts` だけ書き換える。コンポーネントや CSS は触らなくてよい。
型が付いているので、項目名を間違えるとエディタと `npm run build` が教えてくれる。

| 直したいもの | 触る場所 |
|---|---|
| 名前・肩書き | `content.brand` |
| トップの背景・キャッチコピー | `content.hero` |
| 作品一覧 | `content.works.items` |
| 自己紹介・顔写真 | `content.profile` |
| プラン・料金・撮影の流れ | `content.service` |
| 連絡先 | `content.contact` / `content.footer.sns` |

### 画像・動画ファイルの置き場所

**`public/` に置く。** `content.ts` にはファイル名だけ書けばよい（`/tkfilms/` の付与は自動）。

### 作品を載せる

`youtubeId` に YouTube の動画IDを入れると、プレースホルダが埋め込みプレイヤーに変わる。

```ts
{ title: '〇〇ホテル ブランドムービー', category: 'Brand Movie', youtubeId: 'dQw4w9WgXcQ' }
```

動画IDは URL の `https://www.youtube.com/watch?v=` の後ろの部分。`null` のあいだは斜線のプレースホルダが出る。

### トップの背景に動画を入れる

```ts
media: { type: 'video', src: 'showreel.mp4', poster: 'poster.jpg' }
```

画像なら `{ type: 'image', src: 'hero.jpg' }`。

> ⚠️ 動画を自前で置くとリポジトリが重くなる。長尺は YouTube 埋め込みを使う。

### 写真を入れる

`content.profile.portrait` にファイル名を入れる（`null` のあいだはプレースホルダ）。

## デザインを変えるとき

色・書体・余白・イージングは `src/index.css` の `@theme` にまとまっている。
ここで定義した値は Tailwind のクラス名としてそのまま使える。

```css
--color-accent: #fff100;   /* → text-accent / bg-accent / border-accent */
--font-display: 'Six Caps';/* → font-display */
--spacing-pad: clamp(...); /* → px-pad / py-pad */
--breakpoint-wide: 1200px; /* → wide:flex （PCナビとサイドドットの出現点） */
```

セクションの背景色は `index.css` の `main > section:nth-of-type(even)` で交互に切り替わる。
`App.tsx` でセクションを並べ替えると自動で追従するので、個別に背景を指定しないこと。

## セクションを追加するとき

1. `content.types.ts` の `SectionId` に id を足す
2. `content.ts` の `nav` に項目を足し、本文データを書く
3. `src/sections/` にコンポーネントを作る（`<Section id="...">` で包む）
4. `App.tsx` の `<main>` に並べる

ナビ・サイドドット・現在地表示は `content.nav` から自動で作られるので、個別の対応は要らない。

## 現状

**中身はすべて仮素材。** `[ ... ]` で囲まれたテキストは差し替え待ちの目印。

素材が揃うまで検索エンジンにインデックスさせないよう、`index.html` の `<head>` に `<meta name="robots" content="noindex">` を入れてある。公開して問題ない状態になったら、**この1行を削除する**。

## 独自ドメインを当てるとき

1. `public/CNAME` を作り、ドメイン名だけを1行書く
2. ドメイン側の DNS に GitHub Pages の A レコード（または `iyeru.github.io` への CNAME）を設定する
3. リポジトリの Settings → Pages で Custom domain を設定し、Enforce HTTPS を有効にする
4. **`vite.config.ts` の `base` を `'/tkfilms/'` から `'/'` に変える**（これを忘れると CSS と JS が 404 になる）

ドメインを当てると URL から `/tkfilms/` が消える。すでに配ったリンクは新URLへリダイレクトされない点に注意。
