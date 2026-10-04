# 残っていること

このリポジトリは Issues を無効にしてある（Public にしているのは Pages で配信するためだけで、
外から issue を立てられる状態にしたくない）。そのため「まだ終わっていない作業」はここに集める。

終わった項目は消す。履歴は git が持っているので、チェック済みの行を残さない。

---

## 3. 素材が揃ったら noindex を外す

`index.html` の `<meta name="robots" content="noindex">` の1行を削除する。
素材の差し替えは #42（阪井の顔写真）ですべて終わった。外すかどうか・いつ外すかは shinta が決める。

## 4. 日本語フォント導入前に撮ったベースラインが4件残っている

2026-09-11 から `~/.config/fontconfig/fonts.conf` で Windows 側のフォントを読むようになり
（`sans-serif` → Yu Gothic UI）、視覚テストの日本語は豆腐ではなくなった。
それ以降に #43・#44・#45 で撮り直し、26件中22件は今の環境の姿になっている。
残っているのは 2026-09-02（#40 以前）に撮ったままの次の4件。どれも閾値（2%）内で通っている。

- `gram-desktop` / `gram-tablet` / `gram-mobile`
- `hover-back-to-top`

揃えるなら `npx playwright test -g "gram|back-to-top" --update-snapshots=all`（4件・上書き）。
いつでも着手できる。
[visual/README.md の「この比較で見えていないもの」](../visual/README.md) の豆腐の記述も合わせて直す。

**回すときは、他の重い処理（動画の書き出しなど）を止めておく。** #43 のころのタイムアウトは、
フォントではなく CPU の取り合いが原因だった。混んでいるとき（負荷平均 12.6 / 8コア）は
スクロールだけで 52 秒かかり、1件 30 秒のタイムアウトに収まらない。空いていれば 4〜5 秒で、
About 3件の撮り直しは 39 秒で終わった（#44）。回す前に `uptime` で負荷を見るとよい。

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
測ると完全に安定していて、撮影側の問題。**Clients を入れない状態では全件通る。**

Clients を main に入れる PR でこれが出る。そのときに追う手がかり：

- `visual/regression.spec.ts` の `documentBox()` + `toHaveScreenshot({ fullPage: true, clip })`
- 8px という値の出どころが不明。`Reveal` の `translate-y-[30px]` とも一致しない
- 回避するなら、`fullPage` をやめて `locator.screenshot()` で撮る手がある
  （ただしスクロールが走るのでヘッダーの高さが変わる。#25 でそれを避けて今の形にした経緯がある）
