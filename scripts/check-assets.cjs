const fs = require("fs");
const path = require("path");

function fail(msg) {
  console.error("❌ " + msg);
  process.exit(1);
}

function ok(msg) {
  console.log("✅ " + msg);
}

const dist = path.resolve("./dist");
const indexFile = path.join(dist, "index.html");

// 1) Basic presence
if (!fs.existsSync(dist)) fail("dist/ does not exist. Did the build run?");
if (!fs.existsSync(indexFile)) fail("dist/index.html not found.");

// 2) Collect asset links from index.html
const html = fs.readFileSync(indexFile, "utf8");
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
const srcs = [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
const urls = Array.from(new Set([...hrefs, ...srcs]));

// Only validate vite-emitted assets + favicon
const interesting = urls.filter(u =>
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

// 3) Validate data/products.json exists and parses
const dataFile = path.join(dist, "data", "products.json");
if (!fs.existsSync(dataFile)) fail("Missing dist/data/products.json");
let products;
try {
  products = JSON.parse(fs.readFileSync(dataFile, "utf8"));
} catch (e) {
  fail("products.json is not valid JSON");
}
ok("products.json present and JSON parses.");

// 4) Ensure images referenced by first product exist in dist
const items = Array.isArray(products)
  ? products
  : Array.isArray(products?.items)
  ? products.items
  : [];

const first = items.length ? items[0] : {};
const images = new Set();
if (first?.image) images.add(first.image);
if (Array.isArray(first?.images)) first.images.forEach(x => x && images.add(x));
if (first?.thumbnail) images.add(first.thumbnail);

for (const p of images) {
  const rel = String(p || "").replace(/^\//, ""); // site-absolute -> relative
  const fp = path.join(dist, rel);
  if (!fs.existsSync(fp)) fail(`Image from first product not in dist: ${rel}`);
}
ok("First product images exist in dist (if any were referenced).");

// 5) Friendly summary
console.log("---- SUMMARY ----");
console.log("Assets referenced by index.html: OK");
console.log("data/products.json: OK");
console.log(`First product: ${items.length ? "checked image refs" : "no products to validate"}`);
console.log("-----------------");
