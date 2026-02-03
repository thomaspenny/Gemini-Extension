// Load saved API key on popup open
document.addEventListener('DOMContentLoaded', async () => {
  const result = await chrome.storage.local.get(['geminiApiKey']);
  if (result.geminiApiKey) {
    document.getElementById('apiKey').value = result.geminiApiKey;
  }
});

// Save API key
document.getElementById('saveKeyBtn').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  if (!apiKey) {
    showError('Please enter an API key');
    return;
  }
  
  await chrome.storage.local.set({ geminiApiKey: apiKey });
  showResponse('API key saved successfully!');
});

// Ask Gemini button handler
document.getElementById('askBtn').addEventListener('click', async () => {
  const question = document.getElementById('question').value.trim();
  const apiKey = document.getElementById('apiKey').value.trim();
  
  if (!apiKey) {
    showError('Please enter and save your Gemini API key first');
    return;
  }
  
  if (!question) {
    showError('Please enter a question');
    return;
  }
  
  // Disable button and show loading
  const askBtn = document.getElementById('askBtn');
  askBtn.disabled = true;
  showResponse('Analyzing webpage and generating response...', true);
  
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Extract page content using content script
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractPageContent
    });
    
    const pageContent = results[0].result;
    
    if (!pageContent || !pageContent.text) {
      throw new Error('Could not extract page content');
    }
    
    // Send to Gemini API
    const response = await queryGemini(apiKey, question, pageContent);
    showResponse(response);
    
  } catch (error) {
    console.error('Error:', error);
    showError(`Error: ${error.message}`);
  } finally {
    askBtn.disabled = false;
  }
});

// Function to extract page content (runs in page context)
function extractPageContent() {
  const title = document.title;
  const url = window.location.href;
  
  // Remove script and style elements
  const clone = document.body.cloneNode(true);
  const scripts = clone.querySelectorAll('script, style, noscript');
  scripts.forEach(el => el.remove());
  
  // Get visible text
  const text = clone.innerText || clone.textContent;
  
  // Limit content length to avoid token limits
  const maxLength = 10000;
  const truncatedText = text.substring(0, maxLength);
  
  return {
    title,
    url,
    text: truncatedText,
    truncated: text.length > maxLength
  };
}

// Query Gemini API
async function queryGemini(apiKey, question, pageContent) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`;
  
  // Sanitize title and URL to prevent prompt injection
  const sanitizedTitle = (pageContent.title || 'Untitled').substring(0, 200);
  const sanitizedUrl = (pageContent.url || 'Unknown URL').substring(0, 500);
  
  const prompt = `You are analyzing a webpage. Here are the details:

Title: ${sanitizedTitle}
URL: ${sanitizedUrl}
${pageContent.truncated ? '(Content truncated to fit limits)' : ''}

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
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
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

// Helper function to display response
function showResponse(message, isLoading = false) {
  const responseBox = document.getElementById('response');
  responseBox.textContent = message;
  responseBox.className = 'response-box' + (isLoading ? ' loading' : '');
}

// Helper function to display errors
function showError(message) {
  const responseBox = document.getElementById('response');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = message; // Use textContent to prevent XSS
  responseBox.innerHTML = '';
  responseBox.appendChild(errorDiv);
  responseBox.className = 'response-box';
}
