import fs from "fs";
import path from "path";

const dist = path.resolve("./dist");
const indexFile = path.join(dist, "index.html");

function fail(msg) {
  console.error("❌", msg);
  process.exit(1);
}

if (!fs.existsSync(indexFile)) fail("dist/index.html not found. Did the build run?");

const html = fs.readFileSync(indexFile, "utf-8");

/**
 * Collect asset URLs from index.html:
 *  - <link rel="stylesheet" href="...">
 *  - <link rel="modulepreload" href="...">
 *  - <script type="module" src="..."> and <script src="...">
 *  - <img src="..."> and any src/href pointing to /assets/
 */
const hrefRegex = /href="([^"]+)"/g;
const srcRegex = /src="([^"]+)"/g;

const urls = new Set();

// pull hrefs
for (const m of html.matchAll(hrefRegex)) urls.add(m[1]);
// pull srcs
for (const m of html.matchAll(srcRegex)) urls.add(m[1]);

// only validate assets served from /assets (vite output)
const interesting = [...urls].filter(u =>
  /^\/assets\//.test(u) ||
  /^assets\//.test(u)
);

// Skip favicon.ico check as it's not critical for CSS loading
const urlsArray = Array.from(urls);
const faviconUrl = urlsArray.find(u => /favicon\.ico$/.test(u));
if (faviconUrl) {
  console.log(`ℹ️  Found favicon reference: ${faviconUrl}`);
}

// optional: restrict to known extensions
const exts = /\.(css|js|mjs|cjs|map|png|jpg|jpeg|webp|svg|gif|ico|avif)$/i;
const toCheck = interesting.filter(u => exts.test(u));

if (toCheck.length === 0) {
  console.warn("⚠️  No asset links found in index.html matching /assets/* (is this expected?)");
}

for (const link of toCheck) {
  // normalize: remove leading slash to map into dist/
  const rel = link.replace(/^\//, "");
  const filePath = path.join(dist, rel);
  if (!fs.existsSync(filePath)) {
    fail(`Missing asset referenced by index.html: ${rel}`);
  }
}

console.log("✅ All referenced assets in dist/index.html exist on disk.");

// BONUS: quick size sanity (catch empty CSS/JS)
const small = [];
for (const link of toCheck) {
  const rel = link.replace(/^\//, "");
  const fp = path.join(dist, rel);
  const stat = fs.statSync(fp);
  if (/\.(css|js|mjs)$/.test(rel) && stat.size < 200) {
    small.push(`${rel} (${stat.size} bytes)`);
  }
}
if (small.length) {
  console.warn("⚠️  Suspiciously small bundles detected:\n - " + small.join("\n - "));
}
