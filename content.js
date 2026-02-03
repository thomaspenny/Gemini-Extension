// Content script - runs in the context of web pages
// This file is injected into every webpage to allow communication between the extension and the page

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const pageContent = extractPageContent();
    sendResponse(pageContent);
  }
  return true; // Keep the message channel open for async response
});

// Extract and return page content
function extractPageContent() {
  const title = document.title;
  const url = window.location.href;
  
  // Clone the body to avoid modifying the actual page
  const clone = document.body.cloneNode(true);
  
  // Remove script, style, and noscript elements
  const unwantedElements = clone.querySelectorAll('script, style, noscript, iframe');
  unwantedElements.forEach(el => el.remove());
  
  // Get visible text
  const text = clone.innerText || clone.textContent;
  
  // Limit content length to avoid token limits (10,000 characters)
  const maxLength = 10000;
  const truncatedText = text.substring(0, maxLength);
  
  return {
    title,
    url,
    text: truncatedText,
    truncated: text.length > maxLength,
    originalLength: text.length
  };
}
