# 残っていること

このリポジトリは Issues を無効にしてある（Public にしているのは Pages で配信するためだけで、
外から issue を立てられる状態にしたくない）。そのため「まだ終わっていない作業」はここに集める。

終わった項目は消す。履歴は git が持っているので、チェック済みの行を残さない。

---

## 3. 素材が揃ったら noindex を外す

`index.html` の `<meta name="robots" content="noindex">` の1行を削除する。
素材の差し替えは #42（阪井の顔写真）ですべて終わった。外すかどうか・いつ外すかは shinta が決める。

## 11. 取引先ロゴの扱いが Works と Clients で正反対になっている

README の「代表作を差し替える」は **`client.logo` は白抜き版を置く**、「取引先のロゴを載せる」は
**白抜きは使用規定で禁じられていることが多いので色を変えずに明るい板に載せる**、と書いている。
実際に花と華のロゴが、Works の代表作では白抜き（`public/images/hana-to-hana-logo.png`）、
すぐ下の Clients では原色（`public/clients/hana-to-hana.png`）で、1ページに2回出る。

どちらに揃えるか（あるいは代表作の Client 表記を残すか）は shinta が決める。
先方のロゴ使用規定が手に入れば、それで決まる。

## 12. Clients がヘッダーのナビにもサイドドットにも無い

`content.nav` と `content.dots` は Home / Works / Portfolio / About / Contact で、Clients は入っていない。
足すなら `src/sections/Clients.tsx` の `<Section>` に `id="clients"` を付け、両方に1行ずつ足す。
id を付けたら `visual/sections.ts` のセレクタも `#clients` に替えられる。

## 13. Portfolio が視覚回帰テストの対象に入っていない

#35 で Works の下に足した Portfolio が `visual/sections.ts` に無く、見た目が崩れても誰も気づかない。
`{ key: 'portfolio', label: 'Portfolio', selector: '#portfolio' }` を works の次に足し、
`npx playwright test -g "portfolio" --update-snapshots` で3件撮る（件数の記述も 29件→32件に直す）。
