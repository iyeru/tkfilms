import { defineConfig, devices } from '@playwright/test';

const DESIGN_PORT = 4174;
const REACT_PORT = 5175;

export default defineConfig({
  testDir: './visual',
  fullyParallel: false,
  retries: 0,
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
