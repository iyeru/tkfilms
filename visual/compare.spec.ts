import { test, expect, type Page } from '@playwright/test';
import { sections, viewports } from './sections';
import { hoverTargets } from './hover-targets';

// 初回ロードのローディング演出を確実に畳ませるための待機。
// design側は固定1100ms+520ms(fade)で最大1.62秒。react側はreduced-motion指定時は
// フォント読み込み待ちを挟んでも数百ms〜2秒程度。どちらも3秒待てば収まる。
// (design側の reveal アニメーションにも 2.6秒で強制的に全表示にするフォールバックがあり、
//  これも3秒待機でカバーされる)
const LOADER_SETTLE_MS = 3000;

/**
 * YouTube 埋め込みへの通信を遮断する。
 * iframe は freeze CSS で visibility:hidden にしており画には出ないが、
 * 実際には読み込みと再生が続いていて再描画が止まらず、
 * toHaveScreenshot の安定待ちがタイムアウトすることがある（特にホバーで
 * プレビューを差し込む works のカード）。サムネイル(i.ytimg.com)は
 * 背景として実際に見えているので遮断しない。
 */
async function blockEmbeds(page: Page) {
  await page.route('**://*.youtube.com/**', (route) => route.abort());
  await page.route('**://*.youtube-nocookie.com/**', (route) => route.abort());
}

async function injectFreezeStyles(page: Page) {
  // page.addStyleTag() は「今表示しているドキュメント」に注入するため、
  // goto() より前に呼ぶとその後のナビゲーションで消えて何も効かなくなる。
  // 必ず goto() の後に呼ぶこと。
  await page.addStyleTag({
    content: `
      *, *::before, *::after { transition: none !important; animation: none !important; }
      /* フィルムグレインはランダムノイズで比較しても意味がなく、
         わずかな再描画差でスクリーンショットの安定待ちが終わらない原因にもなるため隠す */
      [style*="opacity: 0.055"], .film-grain { display: none !important; }
      /* home/works の動画プレースホルダは実際に YouTube 埋め込みが自動再生されており、
         フレームが毎回変わって絶対に安定しない。レイアウトは崩さず中身だけ見えなくする */
      iframe { visibility: hidden !important; }
      /* works の「THE LONG LIGHT」バナー（5点ドットのカルーセル）も、design原本の
         プレビュー機能が実写真を自動で差し込んでおり、キャプチャの度に写真が変わる。
         背景だけプレースホルダーの斜線に固定する（矢印ボタンのホバーには要素自体が
         見えている必要があるため、visibility:hidden で丸ごと隠すことはしない）。
         design は比率をインラインの aspect-ratio で、react は Tailwind のクラスで
         表しているため、同じ枠を指すのに2つのセレクタが要る */
      [style*="21 / 9"],
      [class*="aspect-21/9"] { background-image: repeating-linear-gradient(45deg,#181818 0 10px,#121212 10px 20px) !important; }
    `,
  });
}

for (const viewport of viewports) {
  test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const section of sections) {
      test(section.key, async ({ page }, testInfo) => {
        const isDesign = testInfo.project.name === 'design';
        const id = isDesign ? section.designId : section.reactId;

        test.skip(id === null, `${section.label}: src/ 側に未実装（visual/sections.ts の reactId が null）`);

        // reactのuseInViewはreduced-motionだと初期表示から即座にinView=trueを返すため、
        // スクロール到達アニメーションのタイミング待ちが不要になる。emulateMediaはpage単位の
        // 設定でドキュメントに紐付かないため、goto()より前でも後でも構わない。
        await blockEmbeds(page);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/');
        await injectFreezeStyles(page);
        await page.waitForTimeout(LOADER_SETTLE_MS);

        const target = page.locator(`#${id}`);
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // locator を直接 toHaveScreenshot() すると、安定確認の度に内部でスクロールをやり直す。
        // このサイトはスクロール量でヘッダーの高さ・背景が変わるため、そのやり直しスクロール自体が
        // 見た目を揺らし続けて「安定しない」まま5秒でタイムアウトすることがあった。
        // 一度だけ自前でスクロールし、以降は座標を固定した page 単位のクリップ撮影にすることで回避する。
        const box = await target.boundingBox();
        if (!box) throw new Error(`#${id} の boundingBox が取得できない`);

        await expect(page).toHaveScreenshot(`${section.key}-${viewport.name}.png`, { clip: box });
      });
    }
  });
}

// ホバーはポインタ操作前提のため、デスクトップ幅のみで比較する
const desktop = viewports.find((v) => v.name === 'desktop');
if (!desktop) throw new Error('visual/sections.ts の viewports に desktop が無い');

test.describe('hover', () => {
  test.use({ viewport: { width: desktop.width, height: desktop.height } });

  for (const target of hoverTargets) {
    test(target.key, async ({ page }, testInfo) => {
      const isDesign = testInfo.project.name === 'design';
      const selector = isDesign ? target.designSelector : target.reactSelector;

      test.skip(selector === null, `${target.label}: src/ 側に未実装（visual/hover-targets.ts の reactSelector が null）`);

      await blockEmbeds(page);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await injectFreezeStyles(page);
      await page.waitForTimeout(LOADER_SETTLE_MS);

      await page.locator(`#${target.scrollId}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const el = page.locator(selector!).first();
      await el.hover();
      // トランジションは無効化済みなのでアニメーション待ちは不要。ただしReactの
      // useScrollPast等、状態更新が次の描画を待つものがあるため一呼吸だけ置く
      await page.waitForTimeout(100);

      const box = await el.boundingBox();
      if (!box) throw new Error(`${target.key} の boundingBox が取得できない`);

      // hoverでscale(1.12)する要素があり、拡大後の見切れを防ぐため余白を持たせてクリップする
      const pad = 20;
      await expect(page).toHaveScreenshot(`hover-${target.key}.png`, {
        clip: {
          x: Math.max(0, box.x - pad),
          y: Math.max(0, box.y - pad),
          width: box.width + pad * 2,
          height: box.height + pad * 2,
        },
      });
    });
  }
});
