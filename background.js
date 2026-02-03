// Background service worker for the extension
// Handles background tasks and API calls

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Gemini Webpage Analyzer extension installed');
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'queryGemini') {
    handleGeminiQuery(request.apiKey, request.question, request.pageContent)
      .then(response => sendResponse({ success: true, data: response }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep the message channel open for async response
  }
});

// Handle Gemini API queries
async function handleGeminiQuery(apiKey, question, pageContent) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  const prompt = `You are analyzing a webpage. Here are the details:

Title: ${pageContent.title}
URL: ${pageContent.url}
${pageContent.truncated ? `(Content truncated from ${pageContent.originalLength} to ${pageContent.text.length} characters)` : ''}

Page Content:
${pageContent.text}

User Question: ${question}

Please provide a helpful and accurate answer based on the webpage content above.`;
  
  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
  };
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error('Unexpected API response format');
  }
  
  return data.candidates[0].content.parts[0].text;
}
