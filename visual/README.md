# ビジュアル回帰チェック

`design/`（原本）と `src/`（React版）を同じセクション・同じビューポートでスクリーンショットして比較する仕組み。
React版が原本から見た目でズレていないかを、目視ではなく機械的に確認するためのもの。

## 使い方

```bash
npm install

# 1. design/ を基準にベースライン画像を作る（design/ を直接編集した時だけ再実行）
npm run visual:baseline

# 2. src/ を基準に比較する（セクションを1つ変換するたびに実行する）
npm run visual:test

# 差分があれば HTML レポートで確認できる
npm run visual:report
```

## 仕組み

- `visual/sections.ts` にセクション一覧と、design側/react側それぞれの `id` を定義している。
  `reactId` が `null` のセクションはまだ `src/` に実装がないという意味で、自動的にテストが skip される。
  セクションを作ったらここを埋める。
- `playwright.config.ts` が `design/` を静的配信するサーバ（4174番）と `npm run dev`（5175番）を両方起動し、
  同じスナップショットファイル名（`{arg}.png`、プロジェクト名を含まない）を両方のプロジェクトで共有する。
  そのため `design` プロジェクトで撮った画像がそのまま `react` プロジェクトの比較対象になる。
- ローディング演出や scroll-reveal のタイミング差でテストが揺れないよう、
  `reducedMotion: 'reduce'` の指定とCSSトランジション無効化、固定待機を入れている（`compare.spec.ts` 参照）。

## 運用の勘所

- セクション単位で変換 → `npm run visual:test` → 該当セクションだけ差分を見る、のサイクルで進める。
  1回で全セクションをまとめて変換しない。
- `maxDiffPixelRatio` は `playwright.config.ts` に `0.02` で仮置きしている。動画プレースホルダなど
  意図して差がある要素があれば、閾値を緩めるかセクションをさらに分割する。
- ベースライン画像（`visual/__screenshots__/`）はコミットする。design/ を直接触らない限り再生成は不要。
- フォントレンダリングはOS依存なので、ベースライン生成と比較は同じ環境（同じマシン、または同じCI）で行うこと。

## 動作確認で分かったこと（ハマりどころ）

- **`page.addStyleTag()` は `page.goto()` より後に呼ぶ。** 先に呼ぶと直後のナビゲーションで
  注入したスタイルごと消え、何も効かなくなる（`compare.spec.ts` の `injectFreezeStyles` 参照）。
- **design/ の home・featured・works セクションには実際に YouTube 埋め込みが自動再生されている。**
  `[ main film — 16:9 embed ]` のような角括弧表記は静止テキストに見えるが、実際のレンダリングでは
  検索でヒットした本物の動画が iframe で流れる。動画フレームは撮影の度に変わるため
  スクリーンショットが絶対に安定しない。`compare.spec.ts` で `iframe { visibility: hidden }` にして回避している。
- **works の「THE LONG LIGHT」カルーセルバナーも同様に実写真が自動で差し込まれる**（design/ の
  プレビュー機能によるもので、静的なHTMLソースには現れない）。`[style*="21 / 9"]` で個別に隠している。
  他のセクションでも同種の「実は動いている」要素が見つかったら、同じやり方で追加していく。
- インラインstyleを属性セレクタで狙うときは、ブラウザが実際にDOMへ反映した後の表記
  （`opacity:.055` ではなく `opacity: 0.055`、`aspect-ratio:21/9` ではなく `aspect-ratio: 21 / 9` など、
  コロン後・スラッシュ前後にスペースが入る）に合わせること。静的HTMLソースの表記のままだとマッチしない。
