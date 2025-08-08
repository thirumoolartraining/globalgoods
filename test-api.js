// Simple script to test the /api/products endpoint in production
import fetch from 'node-fetch';

async function testApi() {
  const url = 'https://global-goods.vercel.app/api/products';
  
  console.log(`Testing API endpoint: ${url}`);
  
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    console.log('Response Status:', response.status);
    console.log('Content-Type:', contentType);
    
    if (isJson) {
      const data = await response.json();
      console.log('Response Data:', {
        count: Array.isArray(data) ? data.length : 'Not an array',
        firstItem: Array.isArray(data) && data.length > 0 ? data[0] : 'No data'
      });
    } else {
      const text = await response.text();
      console.log('Response Text:', text.substring(0, 500) + (text.length > 500 ? '...' : ''));
    }
  } catch (error) {
    console.error('API Test Failed:', error.message);
  }
}

testApi();
