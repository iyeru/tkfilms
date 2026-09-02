# 残っていること

このリポジトリは Issues を無効にしてある（Public にしているのは Pages で配信するためだけで、
外から issue を立てられる状態にしたくない）。そのため「まだ終わっていない作業」はここに集める。

終わった項目は消す。履歴は git が持っているので、チェック済みの行を残さない。

---

## 1. 素材を自分のものに差し替える（最優先）

**いま並んでいる映像・写真はすべて他人の YouTube 動画とそのサムネイル。**
`src/content.ts` の `frame()` が `i.ytimg.com` から拾っており、実体はデザイン原本が
プレビュー用に埋めたままの ID。tkfilms.jp はすでに公開されているので、
**他人の作品が自分の実績として並んでいる状態**になっている。
`noindex` を入れてあるので検索には出ないが、URL を知っていれば誰でも見られる。

差し替える場所は `src/content.ts` の1ファイルだけ。手順は [README の「素材の差し替え方」](../README.md#素材の差し替え方)。

- Hero の背景（`hero.youtubeId` / `poster`）
- Works の代表作1本＋作品6本（`works.feature` / `works.items`）
- About の顔写真2枚（`portrait`）
- Gram の6枚（`gram`）

## 2. About の2人目を残すか決める

`[ 仮素材 ] 遠藤 蒼 / Ao Endo`（プロデューサー / 編集）のブロックが残っている。
1人で活動しているなら、枠ごと消す。

## 3. Hero の注記を消す

`[ 仮素材 — 本番は showreel.mp4 に差し替え ]`（`src/content.ts` の `mediaNote`）。
素材を差し替えたら不要になる。

## 4. 素材が揃ったら noindex を外す

`index.html` の `<meta name="robots" content="noindex">` の1行を削除する。
**1〜3 が終わるまでは絶対に外さない**（他人の素材が検索に載る）。

## 5. 日本語フォントを入れて、比較の精度を上げる

作業環境に日本語フォントが無く、視覚比較のスクリーンショットは日本語が豆腐になる。
原本と React 版の一致は確認できているが、実物での行の折り返しまでは見えていない。
詳しくは [visual/README.md の「この比較で見えていないもの」](../visual/README.md)。

```bash
sudo apt install fonts-noto-cjk
npm run visual:baseline   # 文字の描かれ方が変わるので撮り直しが要る
npm run visual:test
```

## 6. visual/ を型チェックの対象に入れる

`tsconfig.json` の `include` が `["src", "vite.config.ts"]` のままで、
`visual/*.ts` と `playwright.config.ts` が `npm run build` の型チェックを通っていない。
テスト側の型崩れは実行するまで気付けない。
