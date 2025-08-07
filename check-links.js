import blc from 'broken-link-checker';
const { SiteChecker } = blc;

// List of all pages to check
const pagesToCheck = [
  '/',                 // Home
  '/about',
  '/cart',
  '/checkout',
  '/contact',
  '/export',
  '/privacy',
  '/product',
  '/shipping-policy',
  '/shop',
  '/terms',
  '/thank-you',
  '/cancellation-refund',
  '/not-found'         // Should be last as it's a 404 page
];

const baseUrl = 'http://localhost:5000';
let totalLinks = 0;
let brokenLinks = 0;
let checkedPages = 0;
const brokenLinksList = [];

console.log(`Starting link check for ${baseUrl}...\n`);
console.log(`Pages to check: ${pagesToCheck.length}\n`);

const siteChecker = new SiteChecker(
  {
    excludeExternalLinks: false,
    filterLevel: 0,
    maxSockets: 2,
    maxSocketsPerHost: 1,
    rateLimit: 1000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
  {
    'error': (error) => {
      console.error('Error:', error);
    },
    'link': (result, customData) => {
      // Skip data: and mailto: links
      if (result.url.original.startsWith('data:') || result.url.original.startsWith('mailto:')) {
        return;
      }
      
      totalLinks++;
      const status = result.broken ? '❌ BROKEN' : '✅ OK';
      console.log(`[${status}] ${result.url.original} (on ${result.base.original})`);
      
      if (result.broken) {
        brokenLinks++;
        brokenLinksList.push({
          page: result.base.original,
          url: result.url.original,
          reason: result.brokenReason,
          status: result.http.response ? result.http.response.statusCode : 'N/A'
        });
        console.log(`   Reason: ${result.brokenReason}`);
        console.log(`   Status Code: ${result.http.response ? result.http.response.statusCode : 'N/A'}`);
      }
    },
    'page': (error, pageUrl) => {
      checkedPages++;
      if (error) {
        console.error(`\n❌ Error checking page ${pageUrl}:`, error);
      } else {
        console.log(`\n✅ Completed checking page: ${pageUrl} (${checkedPages}/${pagesToCheck.length})`);
      }
      
      // Queue the next page
      if (pagesToCheck.length > 0) {
        const nextPage = pagesToCheck.shift();
        siteChecker.enqueue(`${baseUrl}${nextPage}`);
      }
    },
    'end': () => {
      console.log('\n--- Link Checking Complete ---');
      console.log(`Pages checked: ${checkedPages}`);
      console.log(`Total links checked: ${totalLinks}`);
      console.log(`Broken links found: ${brokenLinks}`);
      
      if (brokenLinks > 0) {
        console.log('\n--- Broken Links Summary ---');
        brokenLinksList.forEach((link, index) => {
          console.log(`\n${index + 1}. Page: ${link.page}`);
          console.log(`   Broken Link: ${link.url}`);
          console.log(`   Reason: ${link.reason}`);
          console.log(`   Status: ${link.status}`);
        });
      }
      
      console.log('\n----------------------------');
      if (brokenLinks === 0) {
        console.log('✅ No broken links found across all pages!');
      } else {
        console.log(`❌ Found ${brokenLinks} broken link(s) that need attention.`);
      }
    }
  }
);

// Start checking with the first page
const firstPage = pagesToCheck.shift();
siteChecker.enqueue(`${baseUrl}${firstPage}`);
