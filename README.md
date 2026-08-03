# tkfilms

映像制作の自己紹介サイト。GitHub Pages で公開している。

- 公開URL: https://iyeru.github.io/tkfilms/
- 管理: iyeru（サイトの中身は本人のもの、リポジトリと公開設定は iyeru が持つ）

## 構成

```
tkfilms/
├── index.html   # サイト本体。1ファイル完結（CSS・JS ともインライン）
└── README.md
```

外部から読み込んでいるのは **Google Fonts だけ**。ビルドもデプロイ手順もない。`main` に push すると数十秒で反映される。

## 素材の差し替え方

`index.html` を開き、`<script>` の冒頭にある **`CONTENT` オブジェクトだけ**を書き換える。HTML の構造や CSS は触らなくてよい。

| 直したいもの | 触る場所 |
|---|---|
| 名前・肩書き | `CONTENT.brand` |
| トップの背景・キャッチコピー | `CONTENT.hero` |
| 作品一覧 | `CONTENT.works.items` |
| 自己紹介・顔写真 | `CONTENT.profile` |
| プラン・料金・撮影の流れ | `CONTENT.service` |
| 連絡先 | `CONTENT.contact` / `CONTENT.footer.sns` |

### 作品を載せる

`youtubeId` に YouTube の動画IDを入れると、プレースホルダが埋め込みプレイヤーに変わる。

```js
{ title: '〇〇ホテル ブランドムービー', category: 'Brand Movie', youtubeId: 'dQw4w9WgXcQ' }
```

動画IDは URL の `https://www.youtube.com/watch?v=` の後ろの部分。`null` のあいだは斜線のプレースホルダが出る。

### トップの背景に動画を入れる

```js
media: { type: 'video', src: 'showreel.mp4', poster: 'poster.jpg' }
```

画像なら `{ type: 'image', src: 'hero.jpg' }`。ファイルは `index.html` と同じ階層に置く。

> ⚠️ 動画を自前で置くとリポジトリが重くなる。長尺は YouTube 埋め込みを使う。

### 写真を入れる

`CONTENT.profile.portrait` にファイル名を入れる（`null` のあいだはプレースホルダ）。

## 現状

**中身はすべて仮素材。** `[ ... ]` で囲まれたテキストは差し替え待ちの目印。

素材が揃うまで検索エンジンにインデックスさせないよう、`index.html` の `<head>` に `<meta name="robots" content="noindex">` を入れてある。公開して問題ない状態になったら、**この1行を削除する**。

## 独自ドメインを当てるとき

1. リポジトリ直下に `CNAME` ファイルを作り、ドメイン名だけを1行書く
2. ドメイン側の DNS に GitHub Pages の A レコード（または `iyeru.github.io` への CNAME）を設定する
3. リポジトリの Settings → Pages で Custom domain を設定し、Enforce HTTPS を有効にする

ドメインを当てると URL から `/tkfilms/` が消える。すでに配ったリンクは新URLへリダイレクトされない点に注意。
