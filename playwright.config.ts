import { defineConfig, devices } from '@playwright/test';

const DESIGN_PORT = 4174;
const REACT_PORT = 5175;

export default defineConfig({
  testDir: './visual',
  fullyParallel: false,
  // 落ちたテストだけ1回やり直す。差分の原因を「通信の揺れ」と「本当のズレ」に
  // 自動で仕分けさせるのが目的で、やり直しで通れば flaky（サムネイルの取得に失敗した等）、
  // 2回とも落ちれば failed（実際に見た目が違う）と report に出る。
  // 全体を回し直して見比べるより、落ちた1件だけを2回見る方が早く、切り分けも確か。
  retries: 1,
  reporter: [['html', { open: 'never' }]],

  // {projectName} を含めない。design プロジェクトで作ったベースラインを
  // react プロジェクトがそのまま比較対象にできるようにするため。
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',

  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },

  webServer: [
    {
      command: 'node visual/static-server.mjs',
      port: DESIGN_PORT,
      reuseExistingServer: !process.env.CI,
      env: { PORT: String(DESIGN_PORT) },
    },
    {
      command: `npm run dev -- --port ${REACT_PORT} --strictPort`,
      port: REACT_PORT,
      reuseExistingServer: !process.env.CI,
    },
  ],

  projects: [
    {
      name: 'design',
      use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${DESIGN_PORT}` },
    },
    {
      name: 'react',
      // vite.config.ts の base: '/tkfilms/' に合わせる
      use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${REACT_PORT}/tkfilms/` },
    },
  ],
});
