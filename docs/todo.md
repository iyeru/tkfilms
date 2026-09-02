# 残っていること

このリポジトリは Issues を無効にしてある（Public にしているのは Pages で配信するためだけで、
外から issue を立てられる状態にしたくない）。そのため「まだ終わっていない作業」はここに集める。

終わった項目は消す。履歴は git が持っているので、チェック済みの行を残さない。

---

## 1. About 阪井の顔写真を差し替える

`src/content.ts` の `about.blocks[1].portrait` が `null` のまま。撮り次第 `images/` に入れて差し替える。
それまでは `af9d27d` の対応で「Coming Soon」表示にしてあるので、他人の素材が出ている状態ではない。

Works の作品6本・Gram の6枚・Hero の背景・高本の顔写真・Works の代表作（花と華）は差し替え済み。

## 2. About の2人目を残すか決める

`[ 仮素材 ] 遠藤 蒼 / Ao Endo`（プロデューサー / 編集）のブロックが残っている。
1人で活動しているなら、枠ごと消す。

## 3. 素材が揃ったら noindex を外す

`index.html` の `<meta name="robots" content="noindex">` の1行を削除する。
**1〜2 が終わるまでは絶対に外さない**（他人の素材が検索に載る）。

## 4. 日本語フォントを入れて、比較の精度を上げる

作業環境に日本語フォントが無く、視覚テストのスクリーンショットは日本語が豆腐になる。
ベースラインも比較も同じ豆腐なので回帰の検出は成立しているが、実物での行の折り返しまでは
見えていない。詳しくは [visual/README.md の「この比較で見えていないもの」](../visual/README.md)。

```bash
sudo apt install fonts-noto-cjk
npm run visual:baseline   # 文字の描かれ方が変わるので撮り直しが要る
npm run visual:test
```

## 5. visual/ を型チェックの対象に入れる

`tsconfig.json` の `include` が `["src", "vite.config.ts"]` のままで、
`visual/*.ts` と `playwright.config.ts` が `npm run build` の型チェックを通っていない。
テスト側の型崩れは実行するまで気付けない。

## 6. セクションを足すと下のセクションの撮影がずれる

`visual/` は `fullPage` で撮ってからドキュメント座標で切り出しているため、**上に何かを挟むと
下のセクションの切り出し位置がずれる**ことがある。中身は同じなのに縦に数pxずれた画が撮れ、
差分としては「全部違う」ように見える。

Works と About の間に Clients セクションを足したところ、`about-desktop` だけが縦 8px ずれて
必ず落ちる状態になった（ずらして重ねると差分ピクセルは0）。`#about` の座標自体はページ側で
測ると完全に安定していて、撮影側の問題。**Clients を入れない状態では30件すべて通る。**

Clients を main に入れる PR でこれが出る。そのときに追う手がかり：

- `visual/regression.spec.ts` の `documentBox()` + `toHaveScreenshot({ fullPage: true, clip })`
- 8px という値の出どころが不明。`Reveal` の `translate-y-[30px]` とも一致しない
- 回避するなら、`fullPage` をやめて `locator.screenshot()` で撮る手がある
  （ただしスクロールが走るのでヘッダーの高さが変わる。#25 でそれを避けて今の形にした経緯がある）

## 7. Contact フォームの送信先を本番用に差し替える

`src/content.ts` の `contact.endpoint` は **テスト用フォーム**（`meaqglje`）を指している。
本番用の Formspree フォームを作ったら、この 1 行を差し替える。

`contact.fallbackEmail` も `null` のまま。送信に失敗した人へメールアドレスを案内するなら
ここに入れる（入れなければ案内は出ない）。

手順は [docs/formspree-setup.md](formspree-setup.md)。差し替えたあと、公開されている
<https://tkfilms.jp/#contact> から 1 回送って**実際に届くこと**を確かめる
（design-review 3-c の完了条件）。テスト用のままだと、問い合わせがテスト側の
受信箱に流れ込む。

## 9. ブランド名 (TKfilms) の書体差し替え、途中で中断

`style/brand-name-no-uppercase` ブランチに**未コミットのまま**残してある。作業内容は次のとおり。

- きっかけ: Header・Hero・Footer のブランド名表示が `uppercase` で強制大文字化され、
  さらに書体 Six Caps が小文字グリフを持たないため `TKfilms` が常に `TKFILMS` に見えていた。
- 対応: `uppercase` を3箇所（`Header.tsx` ロゴ、`Hero.tsx` の h1、`Footer.tsx` のブランド名）から外し、
  ブランド名専用の書体トークン `--font-brand` を新設。Six Caps は見出し全般用として維持。
- 書体は League Gothic → **Big Shoulders（Light, weight 300）** に差し替え済み（自己ホスト、
  `src/fonts/bigshoulders-300-latin.woff2` / `-latin-ext.woff2`。League Gothic の woff2 は削除済み）。
  Six Caps 本体との太さ比較は `font-compare.png` で確認し、Big Shoulders 300 が一番近かった。
- **`npm run build` は通過済み。** ブラウザでの最終見た目確認（`npm run preview` での実機確認）が
  終わる前にユーザーの指示で中断した。

再開するときは:

1. `git switch style/brand-name-no-uppercase` で変更を呼び戻す（`git status` で
   README.md / Header.tsx / Footer.tsx / Hero.tsx / index.css の変更と
   `src/fonts/bigshoulders-300-latin*.woff2` の未追跡ファイルが出るはず）。
2. `npm run preview` で Header・Hero・Footer の `TKfilms` 表示を確認（太さ・小文字の見え方）。
3. 問題なければコミット→ `gh pr create`。ブランチ名は変えなくてよい。
