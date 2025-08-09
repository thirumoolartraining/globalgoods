// scripts/check-assets.cjs
const fs = require("fs");
const path = require("path");
function fail(m){ console.error("❌", m); process.exit(1); }
function ok(m){ console.log("✅", m); }

const dist = path.resolve("./dist");
const indexFile = path.join(dist, "index.html");
if (!fs.existsSync(dist)) fail("dist/ does not exist");
if (!fs.existsSync(indexFile)) fail("dist/index.html missing");

const html = fs.readFileSync(indexFile, "utf-8");
const urls = new Set([...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).concat([...html.matchAll(/src="([^"]+)"/g)].map(m=>m[1])));
const interesting = [...urls].filter(u => /^\/?assets\//.test(u) || /^\/favicon\.ico$/.test(u));
for (const u of interesting) {
  const rel = u.replace(/^\//, "");
  const fp = path.join(dist, rel);
  if (!fs.existsSync(fp)) fail(`Missing asset from index.html: ${rel}`);
}
ok("All assets from index.html exist.");

const dataFile = path.join(dist, "data", "products.json");
if (!fs.existsSync(dataFile)) fail("Missing dist/data/products.json");
let products;
try { products = JSON.parse(fs.readFileSync(dataFile, "utf-8")); } catch { fail("products.json invalid JSON"); }
ok("products.json present and valid.");

const items = Array.isArray(products) ? products : (Array.isArray(products?.items) ? products.items : []);
const first = items[0] || {};
const imgs = new Set();
if (first.image) imgs.add(first.image);
if (Array.isArray(first.images)) first.images.forEach(x=>x && imgs.add(x));
if (first.thumbnail) imgs.add(first.thumbnail);
for (const p of imgs) {
  const rel = String(p).replace(/^\//, "");
  const fp = path.join(dist, rel);
  if (!fs.existsSync(fp)) fail(`First product image missing from dist: ${rel}`);
}
ok("First product image(s) exist (if referenced).");

console.log("---- SUMMARY ----");
console.log(`Assets OK, products.json OK, first product images ${imgs.size ? "OK" : "(none referenced)"}`);

console.log('🔍 Checking build output...');

const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory not found.');
  process.exit(1);
}

console.log('✅ dist directory exists.');

const indexHtml = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.error('❌ index.html missing in dist.');
  process.exit(1);
}

console.log('✅ index.html found.');
console.log('🎯 Build output check complete.');
