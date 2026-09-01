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
         比率（21/9 か 4/3 か）は画面幅で入れ替わるので目印にできない。
         「前へ／次へボタンを直下に持つ枠」という位置で引く。
         aria-label は design が英語・react が日本語なのでセレクタが2つ要る */
      div:has(> button[aria-label="Previous"]),
      div:has(> button[aria-label="前の作品"]) { background-image: repeating-linear-gradient(45deg,#181818 0 10px,#121212 10px 20px) !important; }
    `,
  });
}

/** ページを開いて、撮影できる状態まで落ち着かせる */
async function openAndSettle(page: Page) {
  // reactのuseInViewはreduced-motionだと初期表示から即座にinView=trueを返すため、
  // スクロール到達アニメーションのタイミング待ちが不要になる。emulateMediaはpage単位の
  // 設定でドキュメントに紐付かないため、goto()より前でも後でも構わない。
  await blockEmbeds(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await injectFreezeStyles(page);
  await page.waitForTimeout(LOADER_SETTLE_MS);
}

/**
 * ページ全体を一度スクロールしてから先頭へ戻す。
 * 画面外の要素まで確実に描画・読み込みさせるのが目的。戻すのは、ヘッダーが
 * スクロール量で高さと背景を変える（75px透明 ⇔ 55px塗り）ためで、
 * 撮影時のスクロール位置を必ず0に揃えておかないと同じ画にならない。
 */
async function sweepAndReturnToTop(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
}

/**
 * 背景写真が全部出そろうまで待つ。
 *
 * React版のサムネイルは i.ytimg.com から都度取ってくる（src/content.ts の frame()）。
 * 一方 design原本は同じ写真を書き出し時に取り込んで blob: で持っているので、待たずに出る。
 * この差のせいで、React側だけ読み込みが間に合わず枠が真っ黒のまま撮れてしまい、
 * 「写真が全部食い違っている」ように見える巨大な差分が出ることがある（実際には同じ写真）。
 *
 * 読めなかった URL は握りつぶさずエラーにする。黙って真っ黒を撮って
 * デザイン崩れと区別が付かなくなるより、通信の問題だと分かった方がいい。
 */
async function waitForPhotos(page: Page) {
  const failed = await page.evaluate(async () => {
    const urls = new Set<string>();
    for (const el of document.querySelectorAll('*')) {
      for (const m of getComputedStyle(el).backgroundImage.matchAll(
        /url\("((?:https?|blob):[^"]+)"\)/g,
      )) {
        urls.add(m[1]);
      }
    }
    for (const img of document.querySelectorAll('img')) {
      if (img.src) urls.add(img.src);
    }

    const load = (url: string) =>
      new Promise<boolean>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = url;
      });

    const bad: string[] = [];
    for (const url of urls) {
      // 一度に取りに行くと弾かれることがあるので、失敗したものだけ少し置いて1回だけ引き直す
      if (await load(url)) continue;
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!(await load(url))) bad.push(url);
    }
    return bad;
  });

  if (failed.length > 0) {
    throw new Error(`画像を読み込めなかった（通信の問題）:\n${failed.join('\n')}`);
  }
  // 読み込み完了から実際に描き変わるまでの間
  await page.waitForTimeout(300);
}

/** 要素の位置と大きさを「ドキュメント左上を原点」として返す（fullPage撮影のclip用） */
async function documentBox(page: Page, selector: string) {
  const box = await page.locator(selector).evaluate((el) => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + window.scrollX,
      y: r.top + window.scrollY,
      width: r.width,
      height: r.height,
    };
  });
  if (box.width === 0 || box.height === 0) {
    throw new Error(`${selector} の大きさが 0 （表示されていない）`);
  }
  return box;
}

for (const viewport of viewports) {
  test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const section of sections) {
      test(section.key, async ({ page }, testInfo) => {
        const isDesign = testInfo.project.name === 'design';
        const selector = isDesign ? section.designSelector : section.reactSelector;

        test.skip(
          selector === null,
          `${section.label}: src/ 側に未実装（visual/sections.ts の reactSelector が null）`,
        );

        await openAndSettle(page);
        await sweepAndReturnToTop(page);
        await waitForPhotos(page);

        // ビューポート撮影 + clip だと、画面より高いセクション（works は desktop で 2603px）が
        // 画面に入る1画面ぶんしか比較されず、残りが素通しになる。fullPage で撮ってから
        // ドキュメント座標で切り出すことで、セクションを頭から終わりまで丸ごと比較する。
        // fullPage 撮影はスクロールを伴わないので、locator 撮影で問題になった
        // 「安定確認のたびに再スクロールしてヘッダーが動く」も起きない。
        const box = await documentBox(page, selector!);

        await expect(page).toHaveScreenshot(`${section.key}-${viewport.name}.png`, {
          fullPage: true,
          clip: box,
        });
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

      test.skip(
        selector === null,
        `${target.label}: src/ 側に未実装（visual/hover-targets.ts の reactSelector が null）`,
      );

      await openAndSettle(page);

      await page.locator(`#${target.scrollId}`).scrollIntoViewIfNeeded();
      await waitForPhotos(page);
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

// ドロワーを開いた状態は、本文が左へ寄る・暗幕が乗る・パネルが出るの3つが同時に起き、
// セクション単位の撮影では一切通らない。開閉ボタンは wide(1200px) 未満でしか出ないため
// desktop は対象外。
test.describe('state', () => {
  for (const viewport of viewports.filter((v) => v.width < 1200)) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      test('drawer-open', async ({ page }, testInfo) => {
        const isDesign = testInfo.project.name === 'design';
        // 原本は aria-label が英語、React版は日本語
        const selector = isDesign
          ? 'button[aria-label="Menu"]'
          : 'button[aria-label="メニュー"]';

        await openAndSettle(page);
        await waitForPhotos(page);
        await page.locator(selector).click();
        // 開閉のトランジションは無効化済みなので即座に最終状態になる
        await page.waitForTimeout(200);

        // 画面に固定された暗幕とパネルが主役なので、ページ全体ではなく画面ぶんを撮る
        await expect(page).toHaveScreenshot(`drawer-open-${viewport.name}.png`);
      });
    });
  }
});
