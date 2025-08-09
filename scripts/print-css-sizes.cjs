const fs = require("fs");
const path = require("path");

const dist = path.resolve("dist");
if (!fs.existsSync(dist)) {
  console.error("dist/ not found. Run build first.");
  process.exit(1);
}

const cssFiles = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (p.endsWith(".css")) cssFiles.push(p);
  }
}
walk(dist);

if (!cssFiles.length) {
  console.error("No CSS files found in dist/");
  process.exit(1);
}

console.log("Built CSS files:");
cssFiles.forEach(f => {
  const kb = (fs.statSync(f).size / 1024).toFixed(1);
  console.log(`- ${path.relative(dist, f)}  ->  ${kb} KB`);
});
const largest = cssFiles.map(f => fs.statSync(f).size).sort((a,b)=>b-a)[0] / 1024;
console.log(`Largest CSS ≈ ${largest.toFixed(1)} KB`);
if (largest < 20) {
  console.error("❌ CSS too small. Tailwind likely not running or purged.");
  process.exit(2);
} else {
  console.log("✅ CSS size looks good (Tailwind ran).");
}
