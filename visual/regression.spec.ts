import { test, expect, type Page } from '@playwright/test';
import { sections, viewports } from './sections';
import { hoverTargets } from './hover-targets';

// 初回ロードのローディング演出を確実に畳ませるための待機。
// reduced-motion 指定時はフォント読み込み待ちを挟んでも数百ms〜2秒程度で、
// 3秒待てば収まる。
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
      /* フィルムグレインは全画面に敷く粒なので、残すと「どのピクセルも少し違う」状態に
         なり、本当の差分がノイズに埋もれる。粒自体は固定パターンで回帰の検出に
         寄与しないため、撮影中だけ落とす */
      .film-grain { display: none !important; }
      /* home/works の動画枠は実際に YouTube 埋め込みが自動再生されており、
         フレームが毎回変わって絶対に安定しない。レイアウトは崩さず中身だけ見えなくする */
      iframe { visibility: hidden !important; }
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
 * サムネイルは i.ytimg.com から都度取ってくる（src/content.ts の frame()）ため、
 * 待たないと枠が真っ黒のまま撮れて「写真が全部食い違っている」ように見える
 * 巨大な差分になる（実際には同じ写真の読み込み待ちが間に合っていないだけ）。
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
  // 小数のまま clip に渡さない。ページの別の場所（About の本文量など）が変わって
  // 要素の小数座標がずれただけで、切り出される画像の高さが 1px 動くことがある。
  // ベースラインと1pxでも大きさが違えば比較は問答無用で失敗するので、ここで整数に固定する。
  // 幅と高さは要素自身の値なので、位置がずれても変わらない。
  return {
    x: Math.round(box.x),
    y: Math.round(box.y),
    width: Math.round(box.width),
    height: Math.round(box.height),
  };
}

for (const viewport of viewports) {
  test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const section of sections) {
      test(section.key, async ({ page }) => {
        await openAndSettle(page);
        await sweepAndReturnToTop(page);
        await waitForPhotos(page);

        // ビューポート撮影 + clip だと、画面より高いセクション（works は desktop で 2603px）が
        // 画面に入る1画面ぶんしか比較されず、残りが素通しになる。fullPage で撮ってから
        // ドキュメント座標で切り出すことで、セクションを頭から終わりまで丸ごと比較する。
        // fullPage 撮影はスクロールを伴わないので、locator 撮影で問題になった
        // 「安定確認のたびに再スクロールしてヘッダーが動く」も起きない。
        const box = await documentBox(page, section.selector);

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
    test(target.key, async ({ page }) => {
      await openAndSettle(page);

      await page.locator(`#${target.scrollId}`).scrollIntoViewIfNeeded();
      await waitForPhotos(page);
      await page.waitForTimeout(200);

      const el = page.locator(target.selector).first();
      await el.hover();
      // トランジションは無効化済みなのでアニメーション待ちは不要。ただしReactの
      // useScrollPast等、状態更新が次の描画を待つものがあるため一呼吸だけ置く
      await page.waitForTimeout(100);

      const box = await el.boundingBox();
      if (!box) throw new Error(`${target.key} の boundingBox が取得できない`);

      // hoverでscale(1.12)する要素があり、拡大後の見切れを防ぐため余白を持たせてクリップする。
      // documentBox() と同じ理由で整数に丸めてから渡す
      const pad = 20;
      await expect(page).toHaveScreenshot(`hover-${target.key}.png`, {
        clip: {
          x: Math.max(0, Math.round(box.x) - pad),
          y: Math.max(0, Math.round(box.y) - pad),
          width: Math.round(box.width) + pad * 2,
          height: Math.round(box.height) + pad * 2,
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

      test('drawer-open', async ({ page }) => {
        await openAndSettle(page);
        await waitForPhotos(page);
        await page.locator('button[aria-label="メニュー"]').click();
        // 開閉のトランジションは無効化済みなので即座に最終状態になる
        await page.waitForTimeout(200);

        // 画面に固定された暗幕とパネルが主役なので、ページ全体ではなく画面ぶんを撮る
        await expect(page).toHaveScreenshot(`drawer-open-${viewport.name}.png`);
      });
    });
  }
});
