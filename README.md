# tkfilms

映像制作の自己紹介サイト。GitHub Pages で公開している。

- 公開URL: https://iyeru.github.io/tkfilms/
- 構成: React + TypeScript + Tailwind CSS v4 + Vite
- 開発の進め方（ブランチ・PR・リリース）: [docs/branch-strategy.md](docs/branch-strategy.md)

## ⚠️ いま公開しているのは design 原本

**公開URLが返しているのは `design/`（Claude Design のデザイン原本）で、React 版ではない。**

| | 中身 | 状態 |
|---|---|---|
| `design/` | Claude Design の書き出し（自己解凍形式の単一HTML） | **配信中** |
| `src/` ほか | React + TypeScript + Tailwind v4 + Vite | ソースのみ。配信していない |

切り替えは `.github/workflows/deploy.yml` の中でコメントを入れ替えるだけ。手順はファイル冒頭に書いてある。

`src/` は `design/` の描画と一致するところまで揃えてある。1440 / 900 / 390px の全画面を突き合わせて、差分は 0.003% 未満（文字のアンチエイリアスのみ）。

意図的に原本と変えている点は2つだけ。

- **ドロワーを開いてもヘッダーが消えない。** 原本は本文・ヘッダーをまとめて `transform` した親の中に入れているため、変形した親が固定位置の基準になってしまい、スクロール中にメニューを開くとヘッダーが画面外へ飛ぶ。こちらはヘッダーを親の外に出し、同じぶんだけ個別に寄せている。
- **現れる動きに打ち切りがない。** 原本は表示から 2.6 秒でスクロール位置に関係なく全要素を出してしまうため、実質フェードインが働かない。こちらは画面に入ったときだけ動かす。

> `design/` は自己解凍形式で初回表示に展開待ちが入り、ダミーの実績・料金を含むため `robots noindex` を入れてある。**このまま恒久的に公開する想定ではない。**

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

`main` に push すると GitHub Actions が Pages に配信する（1分ほど）。手順は `.github/workflows/deploy.yml`。

**現在は `design/` をビルドせずそのまま配信する設定。** React 版に切り替えるときは `deploy.yml` のコメントを入れ替える。

> **初回だけ設定が必要**
> リポジトリの Settings → Pages → Build and deployment → Source を **GitHub Actions** に変更する。
> 「Deploy from a branch」のままだとこのワークフローの結果が反映されない。

デプロイの成否は Actions タブで確認できる。

## 構成

```
src/
├── content.ts        # ★ 文言・作品・連絡先。素材差し替えはここだけ
├── content.types.ts  # content.ts の型
├── index.css         # デザイントークン（色・書体・動き）と Six Caps の @font-face
├── App.tsx           # 全体の組み立て
├── fonts/            # Six Caps の woff2。原本と同じものを同梱している
├── sections/         # Hero / Works / About / Equipment / Contact / Gram
├── components/       # ヘッダー・ドロワー・ローダーなど共通部品
├── hooks/            # スクロール・出現アニメーション
└── lib/cn.ts         # クラス名連結・埋め込みURL組み立て・public のパス解決
```

**書体は同梱している。** 欧文は `src/fonts/` の Six Caps（2ファイル 22KB）、和文は OS 標準の角ゴシックに任せていて、Google Fonts は読んでいない。外部へ出ていくのは YouTube の埋め込みとサムネイル（`i.ytimg.com`）だけ。

## 素材の差し替え方

`src/content.ts` だけ書き換える。コンポーネントや CSS は触らなくてよい。
型が付いているので、項目名を間違えるとエディタと `npm run build` が教えてくれる。

| 直したいもの | 触る場所 |
|---|---|
| 名前・肩書き | `content.brand` |
| トップの背景・キャッチコピー | `content.hero` |
| 作品一覧 | `content.works.items` |
| 自己紹介・顔写真 | `content.about.blocks`（1人1ブロック。増やすと写真の左右が自動で交互になる） |
| 使用機材 | `content.equipment.items` |
| 連絡先 | `content.contact` |
| コピーライト | `content.footer.copyright` |

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

`content.about.blocks[].portrait` にファイル名を入れる。ブロックを増やせばそのまま人が増え、写真が左右交互に並ぶ。

## デザインを変えるとき

色・書体・余白・イージングは `src/index.css` の `@theme` にまとまっている。
ここで定義した値は Tailwind のクラス名としてそのまま使える。

```css
--color-warm: #93b4c9;     /* → text-warm / bg-warm / border-warm（CTA・リンク） */
--color-cool: #93b4c9;     /* → text-cool（比率タグ・スペック） */
--font-display: 'Six Caps';/* → font-display */
--spacing-pad: clamp(...); /* → px-pad / py-pad */
--spacing-panel: min(...); /* → w-panel / -translate-x-panel（ドロワーの幅） */
--breakpoint-wide: 1200px; /* → wide:flex （PCナビとサイドドットの出現点） */
--breakpoint-duo: 760px;   /* → duo:grid-cols-2（Works が2カラムに割れる点） */
```

> `--color-warm` は本来 `#e9a94b` の暖色で、「押せるもの」に当てる想定だった。ただし原本は実行時に accent の既定値で上書きしていて画面に暖色が一度も出ないため、配信中の見た目に合わせて寒色を入れてある。暖色に戻すならこの1行だけ変える。

セクションの背景色は各セクションが明示で持つ。`Section` に `tone="alt"` を渡すと `--color-bg-alt` になる。並び順に依存しない指定なので、`App.tsx` でセクションを入れ替えても背景はついてこない。

> ⚠️ Tailwind v4 の `translate-*` / `scale-*` は `transform` ではなく `translate` / `scale` プロパティを書く。`transition` の対象にこれらを入れ忘れると、動きが効かず一瞬で飛ぶ。

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
