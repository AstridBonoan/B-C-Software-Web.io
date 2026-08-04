import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/my-work');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

// Company website — dismiss cookie banner for a clean shot
{
  const page = await context.newPage();
  await page.goto('https://www.tamayenterprises.com/', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
  await page.waitForTimeout(1500);
  const accept = page.getByRole('button', { name: /accept/i });
  if (await accept.count()) {
    await accept.first().click();
    await page.waitForTimeout(500);
  }
  await page.screenshot({
    path: path.join(outDir, 'tamay-enterprises.png'),
    type: 'png',
    fullPage: false,
  });
  console.log('Wrote tamay-enterprises.png');
  await page.close();
}

// Estimator — land on the project-selection step for a clear product shot
{
  const page = await context.newPage();
  await page.goto('https://estimator.tamayenterprises.com/', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
  await page.waitForTimeout(1500);
  const start = page.getByRole('button', { name: /start my estimate/i });
  if (await start.count()) {
    await start.first().click();
    await page.waitForTimeout(1200);
  }
  await page.screenshot({
    path: path.join(outDir, 'tamay-estimator.png'),
    type: 'png',
    fullPage: false,
  });
  console.log('Wrote tamay-estimator.png');
  await page.close();
}

await browser.close();
