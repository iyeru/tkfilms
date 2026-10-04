/*
 * 取引先からもらったロゴを、サイトに載せられる形に直す。
 *
 *   node scripts/logo-to-web.mjs <元データ> <public/clients/xxx.png> [横幅]
 *
 * もらうロゴはたいてい印刷用で、そのままでは暗い画面に置けない。
 *   - CMYK の JPEG（Photoshop 書き出し）→ ブラウザに sRGB でデコードさせる
 *   - 背景が白く塗ってある            → 透過に起こす（下の unpremultiply）
 *   - 余白が広い / 数千 px ある        → 切り詰めて縮める
 *
 * ImageMagick や sharp は入れていない。デコードは devDependency にある
 * Playwright の Chromium にやらせる。CMYK JPEG は Adobe の APP14 マーカーを
 * 読めるデコーダでないと色が反転するので、ブラウザに任せるのが確実。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const [, , src, dest, widthArg] = process.argv;
if (!src || !dest) {
  console.error('usage: node scripts/logo-to-web.mjs <src> <dest.png> [width]');
  process.exit(1);
}
const OUT_WIDTH = Number(widthArg ?? 640);

const dataUri = `data:image/jpeg;base64,${readFileSync(src).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage();

const result = await page.evaluate(
  async ({ dataUri, OUT_WIDTH }) => {
    const img = new Image();
    img.src = dataUri;
    await img.decode();

    const probe = document.createElement('canvas');
    probe.width = img.naturalWidth;
    probe.height = img.naturalHeight;
    const pctx = probe.getContext('2d', { willReadFrequently: true });
    pctx.drawImage(img, 0, 0);

    const { data } = pctx.getImageData(0, 0, probe.width, probe.height);
    // 余白の切り落とし。3チャンネルとも 245 以上なら「白い余白」とみなす
    const WHITE = 245;
    let top = probe.height, left = probe.width, right = -1, bottom = -1;
    for (let y = 0; y < probe.height; y++) {
      for (let x = 0; x < probe.width; x++) {
        const i = (y * probe.width + x) * 4;
        if (data[i] < WHITE || data[i + 1] < WHITE || data[i + 2] < WHITE) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }
    const cropW = right - left + 1;
    const cropH = bottom - top + 1;

    const scale = OUT_WIDTH / cropW;
    const out = document.createElement('canvas');
    out.width = OUT_WIDTH;
    out.height = Math.round(cropH * scale);
    const octx = out.getContext('2d', { willReadFrequently: true });
    octx.imageSmoothingQuality = 'high';
    octx.drawImage(img, left, top, cropW, cropH, 0, 0, out.width, out.height);

    // 白地を透過に起こす。元データは印刷用で背景が白く塗られており、
    // そのまま暗い画面に置くと白い長方形が浮くため。
    //
    // 「白に近いほど薄い」で alpha を出すだけだと、紫の花（明度が高い）まで
    // 薄くなって色が変わってしまう。白との合成 p = a*C + (1-a)*255 を解いて
    // 元の色 C を復元する（unpremultiply）。塗りつぶしの画素は a=1 になるので
    // 墨も紫も元の色のまま残り、縁のアンチエイリアスだけが半透明になる。
    const outData = octx.getImageData(0, 0, out.width, out.height);
    const p = outData.data;
    for (let i = 0; i < p.length; i += 4) {
      const m = Math.min(p[i], p[i + 1], p[i + 2]);
      const a = 1 - m / 255;
      if (a < 0.01) {
        p[i + 3] = 0; // 背景。色は問わないので触らない
        continue;
      }
      for (let c = 0; c < 3; c++) {
        p[i + c] = Math.max(0, Math.min(255, Math.round((p[i + c] - (1 - a) * 255) / a)));
      }
      p[i + 3] = Math.round(a * 255);
    }
    octx.putImageData(outData, 0, 0);

    return {
      source: { w: img.naturalWidth, h: img.naturalHeight },
      crop: { left, top, w: cropW, h: cropH },
      out: { w: out.width, h: out.height },
      png: out.toDataURL('image/png'),
    };
  },
  { dataUri, OUT_WIDTH },
);

await browser.close();

writeFileSync(dest, Buffer.from(result.png.split(',')[1], 'base64'));
console.log(JSON.stringify({ ...result, png: undefined, bytes: readFileSync(dest).length }, null, 2));
