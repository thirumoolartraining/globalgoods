const fg = require('fast-glob');
const path = require('path');

const patterns = [
  './client/index.html',
  './client/src/**/*.{js,ts,jsx,tsx,html}',
  './shared/**/*.{ts,tsx}'
];

async function testGlobs() {
  console.log('Testing patterns relative to:', process.cwd());
  
  for (const pattern of patterns) {
    console.log(`\nPattern: ${pattern}`);
    const files = await fg([pattern], { absolute: true });
    console.log(`Matches: ${files.length} files`);
    console.log('First 10 matches:');
    console.log(files.slice(0, 10).map(f => `- ${f}`).join('\n'));
  }
}

testGlobs().catch(console.error);
