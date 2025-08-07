// For Node.js versions prior to v18, or if using CommonJS modules, 
// you might need to install and import 'node-fetch':
// npm install node-fetch@2 // For CommonJS
// const fetch = require('node-fetch'); 

async function fetchDataFromUrl(url) {
  try {
    const response = await fetch(url);

    // Check if the response was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response body as JSON
    const data = await response.json(); 
    console.log('Fetched data:', data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Example usage with a public API URL
const exampleUrl = 'https://jsonplaceholder.typicode.com/posts/1'; 
fetchDataFromUrl(exampleUrl);