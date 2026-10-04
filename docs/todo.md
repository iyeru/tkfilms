# 残っていること

このリポジトリは Issues を無効にしてある（Public にしているのは Pages で配信するためだけで、
外から issue を立てられる状態にしたくない）。そのため「まだ終わっていない作業」はここに集める。

終わった項目は消す。履歴は git が持っているので、チェック済みの行を残さない。

---

## 3. 素材が揃ったら noindex を外す

`index.html` の `<meta name="robots" content="noindex">` の1行を削除する。
素材の差し替えは #42（阪井の顔写真）ですべて終わった。外すかどうか・いつ外すかは shinta が決める。

## 4. 日本語フォント導入後、閾値内で残った旧ベースラインを揃える

2026-09-11 から `~/.config/fontconfig/fonts.conf` で Windows 側のフォントを読むようになり
（`sans-serif` → Yu Gothic UI）、視覚テストの日本語は豆腐ではなくなった。
#43 でベースラインを撮り直したが、`--update-snapshots` は**閾値（2%）を超えた9件しか書き換えない。**

- 和文の少ない画像（contact の desktop / tablet など）は、豆腐のまま 2% 未満で通っている
- tablet の works は #43 のときタイムアウトで落ち、撮り直せていない
- About の3件は #44 で撮り直し済み

全件を今の環境で揃えるなら `npx playwright test --update-snapshots=all`。いつでも着手できる。
[visual/README.md の「この比較で見えていないもの」](../visual/README.md) の豆腐の記述も合わせて直す。

**回すときは、他の重い処理（動画の書き出しなど）を止めておく。** #43 のころのタイムアウトは、
フォントではなく CPU の取り合いが原因だった。混んでいるとき（負荷平均 12.6 / 8コア）は
スクロールだけで 52 秒かかり、1件 30 秒のタイムアウトに収まらない。空いていれば 4〜5 秒で、
About 3件の撮り直しは 39 秒で終わった（#44）。回す前に `uptime` で負荷を見るとよい。

ついでに確認: テストの件数が 26 件と出たことがある。CLAUDE.md・visual/README.md・項目6 の「30件」と合わない。

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

## 9. ブランド名 (TKfilms) の書体差し替え（やり直し）

Header・Hero・Footer のブランド名が `uppercase` で強制大文字化され、さらに書体 Six Caps が
小文字グリフを持たないため、`TKfilms` が常に `TKFILMS` に見えている。

一度途中まで進めたが、**未コミットの変更が失われ、何も残っていない**（2026-10-04 確認）。
`style/brand-name-no-uppercase` ブランチは古い main（b8e9399）を指しているだけで独自のコミットはなく、
stash も無く、`src/fonts/bigshoulders-*.woff2` と比較画像 `font-compare.png` も見つからない。
未コミットの変更はブランチではなく作業ツリーに乗るため、どこかの切り替えで消えたとみられる。

前回決めた方針（これに沿ってやり直す）:

- `uppercase` を3箇所から外す: `src/components/Header.tsx` のロゴ、`src/sections/Hero.tsx` の h1、
  `src/components/Footer.tsx` のブランド名
- ブランド名専用の書体トークン `--font-brand` を `src/index.css` に新設する。
  Six Caps（`--font-display`）は見出し全般用として残す
- 書体は **Big Shoulders（Light, weight 300）** を自己ホストする（`src/fonts/` に latin / latin-ext の woff2）。
  Six Caps と太さを並べて比べ、300 が一番近かった。League Gothic も試したが採らなかった
- `npm run preview` で Header・Hero・Footer の `TKfilms` の太さと小文字の見え方を確認してから PR を出す

最新の main から切り直す。古い `style/brand-name-no-uppercase` は中身が無いので、
同じ名前を使うなら先に消す。
