import { execSync } from 'child_process';
import { mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = join(__dirname, 'temporary screenshots');
mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0'));
const next = (Math.max(0, ...nums) + 1);
const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const filepath = join(dir, filename);

// Use macOS screencapture with a simple approach - just save the page
const script = `
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('${url}', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: '${filepath.replace(/'/g, "\\'")}', fullPage: true });
  await browser.close();
  console.log('Screenshot saved to: ${filename}');
})();
`;

try {
  execSync(`node -e "${script.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`, { stdio: 'inherit', timeout: 60000 });
} catch (e) {
  // Fallback: try using /usr/bin/open to open the URL
  console.log(`Could not take automated screenshot. Opening ${url} in browser...`);
  console.log(`Screenshot would be saved as: ${filename}`);
  try {
    execSync(`/usr/bin/open "${url}"`);
  } catch {}
}
