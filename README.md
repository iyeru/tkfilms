# tkfilms

映像制作の自己紹介サイト。GitHub Pages で公開している。

- 公開URL: https://tkfilms.jp/
- 構成: React + TypeScript + Tailwind CSS v4 + Vite
- 開発の進め方（ブランチ・PR・リリース）: [docs/branch-strategy.md](docs/branch-strategy.md)
- 残っている作業: [docs/todo.md](docs/todo.md)（Issues は無効にしてあるのでここに集める）
- 問い合わせフォームの送信先の用意: [docs/formspree-setup.md](docs/formspree-setup.md)

## design 原本と React 版

| | 中身 | 状態 |
|---|---|---|
| `src/` ほか | React + TypeScript + Tailwind v4 + Vite | **配信中** |
| `design/` | Claude Design の書き出し（自己解凍形式の単一HTML） | 見た目の正解として保管。配信していない |

`design/` は捨てずに残してあるが、配信もテストもしていない。見た目の由来を辿るための資料。

**移植は完了しており、`visual/` はもう原本との突き合わせではない。** `src/` を前回撮った自分自身と比べる回帰テストになっている（[visual/README.md](visual/README.md)）。見た目を意図して変えたときは、差分を確認したうえでベースラインを撮り直す。

配信の切り替えは `.github/workflows/deploy.yml` のコメントを入れ替えるだけ。手順はファイル冒頭に書いてある。

移植のときに意図的に原本と変えた点は次のとおり。

- **ドロワーを開いてもヘッダーが消えない。** 原本は本文・ヘッダーをまとめて `transform` した親の中に入れているため、変形した親が固定位置の基準になってしまい、スクロール中にメニューを開くとヘッダーが画面外へ飛ぶ。こちらはヘッダーを親の外に出し、同じぶんだけ個別に寄せている。
- **現れる動きに打ち切りがない。** 原本は表示から 2.6 秒でスクロール位置に関係なく全要素を出してしまうため、実質フェードインが働かない。こちらは画面に入ったときだけ動かす。
- **Hero の名前を Six Caps で組んでいる。** 原本は `<h1>` だけ和文 sans で、同じ「STUDIO KAIRO」がヘッダー（Six Caps）と 2 種類の書体で出ていた。一番強くあるべきファーストビューの字がサイト内で一番弱い状態だったので、ヘッダー・セクション見出し・フッターと同じ体系に揃えた。
- **About の中身が原本より先に進んでいる。** 本文を提案資料の自己紹介に差し替え、実績の箇条書きも足してある（#24）。

> 素材がまだ仮のため `robots noindex` を入れてある。詳しくは下の「現状」を読む。

## 開発

```bash
npm install
npm run dev        # http://localhost:5173/
```

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバ（保存すると即反映） |
| `npm run build` | 型チェック → `dist/` に本番ビルド |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run typecheck` | 型チェックだけ |

## 公開

`main` に push すると GitHub Actions が Pages に配信する（1分ほど）。手順は `.github/workflows/deploy.yml`。

**現在は `src/` をビルドして `dist/` を配信する設定。** ビルドは型チェック込みで、落ちればそこで止まり公開はされない。`design/` の直接配信に戻すときは `deploy.yml` のコメントを入れ替える（ただし `design/` には CNAME が無いので、戻すと独自ドメインが外れる）。

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
| 問い合わせの送信先 | `content.contact.endpoint`（[手順](docs/formspree-setup.md)） |
| コピーライト | `content.footer.copyright` |

### 画像・動画ファイルの置き場所

**`public/` に置く。** `content.ts` にはファイル名だけ書けばよい（base の付与は自動）。

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

差し替えが必要なものと、その他の残作業は [docs/todo.md](docs/todo.md) にまとめてある。

## 独自ドメイン（tkfilms.jp）

設定済み。内訳は次のとおり。

- `public/CNAME` … `tkfilms.jp` の1行。ビルド時に `dist/` へコピーされる
- `vite.config.ts` の `base` … `'/'`（ルート配信）
- リポジトリの Settings → Pages → Custom domain に `tkfilms.jp`、Enforce HTTPS を有効
- お名前.com の DNS
  - `tkfilms.jp` の A レコード → `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
  - `www.tkfilms.jp` の CNAME → `iyeru.github.io`

旧URL `https://iyeru.github.io/tkfilms/` からのリダイレクトは行われない。
