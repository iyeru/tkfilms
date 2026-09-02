import { defineConfig, devices } from '@playwright/test';

const PORT = 5175;

export default defineConfig({
  testDir: './visual',
  fullyParallel: false,
  // 落ちたテストだけ1回やり直す。差分の原因を「通信の揺れ」と「本当のズレ」に
  // 自動で仕分けさせるのが目的で、やり直しで通れば flaky（サムネイルの取得に失敗した等）、
  // 2回とも落ちれば failed（実際に見た目が違う）と report に出る。
  // 全体を回し直して見比べるより、落ちた1件だけを2回見る方が早く、切り分けも確か。
  retries: 1,
  reporter: [['html', { open: 'never' }]],

  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',

  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },

  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },

  // 比較対象は src/ の今の姿ひとつだけなので project は分けない。
  // vite.config.ts の base: '/' に合わせる（独自ドメインのルート配信）。
  use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${PORT}/` },
});
