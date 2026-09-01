# CLAUDE.md

映像制作の自己紹介サイト（React + TypeScript + Tailwind CSS v4 + Vite / GitHub Pages）。
コードの構成と素材の差し替え方は [README.md](README.md) を読む。

## 作業の進め方

詳細は [docs/branch-strategy.md](docs/branch-strategy.md)。最低限、次を守る。

- **`main` で直接作業しない。** 開始時に `git switch main && git pull` してから `git switch -c 種類/内容` で切る。編集前に必ず現在のブランチを確認する。
- **`main` へのマージはしない。** PR（`gh pr create`）を出すところまでで、レビューとマージは shinta が行う。
- **push 前に `npm run build` を通す。** 型チェック込み。落ちたまま PR を出さない。
- **1ブランチ1テーマ。** 頼まれていない修正を混ぜない。
- コミットメッセージは `種類: 日本語の要約`（`feat:` `fix:` `style:` `refactor:` `content:` `chore:` `docs:`）。

例外として、ドキュメントのみの修正は `main` に直接コミットしてよい。迷ったらブランチを切る。

## その他

- `work/` は git 管理外の作業メモ置き場。ここに置いたものはコミットされない。
- 素材はすべて仮。`[ ... ]` で囲まれたテキストは差し替え待ちの目印。
- `index.html` の `<meta name="robots" content="noindex">` は意図的に入れてある。勝手に外さない。
