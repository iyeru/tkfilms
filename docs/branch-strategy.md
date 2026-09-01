# ブランチ戦略

個人開発の静的サイト1本。凝った運用はしない。**GitHub Flow を最小構成にしたもの**を使う。

```
main ──●────────────●────────────●──→  push されるたび自動デプロイ（= 公開中のサイト）
        \          /  \         /
         ●──●─────    ●──●─────
       feat/xxx        fix/yyy      ← 作業はここ。PR を立てて shinta がレビュー
```

## 3つの原則

1. **`main` は常に「今公開されているサイト」**。push した瞬間に本番へ出る（`.github/workflows/deploy.yml`）。壊れたものを入れない。
2. **作業は必ずブランチを切る。`main` で直接編集しない。**
3. **`main` へのマージとデプロイの判断は shinta が行う。** Claude はブランチを作り、PR を出すところまで。

## ブランチ

`main` と作業ブランチだけ。`develop` や `release` は作らない（1人 + 静的サイトには重すぎる）。

作業ブランチ名は `種類/内容` のケバブケース。種類はコミットメッセージの prefix と揃える。

| 種類 | 使うとき | 例 |
|---|---|---|
| `feat/` | 機能・セクション・ページの追加 | `feat/works-filter` |
| `fix/` | 表示崩れ・不具合の修正 | `fix/drawer-scroll-lock` |
| `style/` | 見た目だけの調整（挙動を変えない） | `style/hero-spacing` |
| `refactor/` | 中身の整理（見た目は変えない） | `refactor/section-props` |
| `content/` | 素材・文言の差し替え（`src/content.ts` や `public/`） | `content/works-2026` |
| `chore/` | 設定・依存・CI | `chore/bump-vite` |
| `docs/` | README などドキュメント | `docs/branch-strategy` |

ルール:

- **1ブランチ1テーマ。** 「ついでに」他の修正を混ぜない。レビューするのは自分なので、混ざると自分が困る。
- **寿命は短く。** 数日で終わる粒度に切る。長引きそうなら分割する。
- マージ済みブランチはローカル・リモートとも削除する。放置しない。

## 手順

```bash
# 1. 最新の main から切る
git switch main && git pull

# 2. ブランチを作る
git switch -c feat/xxx

# 3. 作業してコミット（こまめに）
git add -A && git commit -m "feat: ○○を追加"

# 4. push 前に必ずビルドを通す（型チェック込み）
npm run build

# 5. push して PR を作る
git push -u origin feat/xxx
gh pr create --base main --title "feat: ○○を追加" --body "..."

# 6. shinta がレビュー → squash merge（GitHub 上で）
#    マージ後、ローカルを片付ける
git switch main && git pull
git branch -d feat/xxx
```

## コミットメッセージ

`種類: 日本語の要約` の1行。既存の履歴に合わせる。

```
feat: 映像制作サイトの初版を追加（仮素材）
fix: ローダーの見出しがリングからはみ出す問題を修正し、表示時間を約3秒に
chore: デプロイに使う actions を最新メジャーに更新
```

- 何をしたかではなく、**何が変わったか**を書く。
- 「なぜ」は本文かPRに書く。件名に詰め込まない。

## PR

- **squash merge に統一する。** `main` の履歴は「1つの変更 = 1コミット」で読める状態を保つ。作業中の細かいコミットは残さない。
- 本文には最低限これを書く。素材差し替え・見た目の変更は**スクショか短い動画を貼る**（後から自分が見返すため）。
  - 何を変えたか
  - 確認したこと（`npm run build` が通る / ローカルで表示を確認した など）
- レビュアーは shinta。Claude は自分でマージしない。

## リリース・ロールバック

- **リリース = `main` へのマージ。** バージョン管理もタグも要らない（`package.json` の `version` は飾り）。
- デプロイの成否は GitHub の Actions タブで見る。反映まで1分ほど。
- **戻したいとき**は `git revert` した PR を出す。`main` を force push で書き換えることは絶対にしない。

```bash
git switch main && git pull
git switch -c fix/revert-xxx
git revert <戻したいコミット>
git push -u origin fix/revert-xxx && gh pr create --base main --title "fix: ○○を戻す"
```

## 例外（`main` に直接 push してよい場合）

サイトの表示に影響しない変更だけ。それ以外は必ずブランチを切る。

- README・このファイルなど、ドキュメントのみの修正
- コメントの誤字修正

判断に迷ったらブランチを切る。切って損することはない。

## Claude に守らせること

Claude 向けの要約は [`CLAUDE.md`](../CLAUDE.md) に置いてある。ここのルールを変えたら、あちらも合わせて直す。
