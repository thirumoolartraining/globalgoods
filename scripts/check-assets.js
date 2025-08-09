import fs from "fs";
import path from "path";

const dist = path.resolve("./dist");
const indexFile = path.join(dist, "index.html");

function fail(msg) { console.error("❌", msg); process.exit(1); }
function ok(msg) { console.log("✅", msg); }

if (!fs.existsSync(indexFile)) fail("dist/index.html not found. Did the build run?");
const html = fs.readFileSync(indexFile, "utf-8");

// Collect asset URLs from index.html
const urls = new Set([
  ...[...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]),
  ...[...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]),
]);

const interesting = [...urls].filter(u =>
  /^\/?assets\//.test(u) || /^\/favicon\.ico$/.test(u)
);

const exts = /\.(css|js|mjs|cjs|map|png|jpg|jpeg|webp|svg|gif|ico|avif)$/i;
const toCheck = interesting.filter(u => exts.test(u));

for (const link of toCheck) {
  const rel = link.replace(/^\//, "");
  const fp = path.join(dist, rel);
  if (!fs.existsSync(fp)) fail(`Missing asset referenced by index.html: ${rel}`);
}
ok("All CSS/JS/image assets referenced in index.html exist.");

// Verify critical data presence
const dataFile = path.join(dist, "data", "products.json");
if (!fs.existsSync(dataFile)) fail("Missing dist/data/products.json");
let products;
try { 
  products = JSON.parse(fs.readFileSync(dataFile, "utf-8")); 
} catch { 
  fail("products.json is not valid JSON"); 
}
ok("products.json present and JSON parses.");

// Validate first product images exist
const items = Array.isArray(products) ? products : Array.isArray(products?.items) ? products.items : [];
const first = Array.isArray(items) && items.length ? items[0] : {};
const images = new Set();
if (first?.image) images.add(first.image);
if (Array.isArray(first?.images)) first.images.forEach(x => x && images.add(x));
if (first?.thumbnail) images.add(first.thumbnail);

for (const p of images) {
  const rel = String(p || "").replace(/^\//, "");
  const fp = path.join(dist, rel);
  if (!fs.existsSync(fp)) fail(`Image from first product not in dist: ${rel}`);
}
ok("First product images exist in dist (if any).");
