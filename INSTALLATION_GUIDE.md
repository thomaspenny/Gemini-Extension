# Installation and Testing Guide

## Quick Start

This browser extension allows you to ask Google's Gemini AI questions about any webpage. Follow these steps to install and test it.

## Prerequisites

1. **Browser**: Chrome, Edge, or any Chromium-based browser
2. **API Key**: Free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Installation Steps

### Step 1: Get Your Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the generated key (you'll need it in Step 4)

### Step 2: Load the Extension

1. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`

2. Enable **"Developer mode"** (toggle switch in the top-right corner)

3. Click the **"Load unpacked"** button

4. Navigate to and select the `Gemini-Extension` folder (the one containing `manifest.json`)

5. The extension should now appear in your extensions list with the sparkle ✨ icon

### Step 3: Pin the Extension (Optional but Recommended)

1. Click the puzzle piece icon in your browser toolbar
2. Find "Gemini Webpage Analyzer" in the list
3. Click the pin icon to keep it visible in your toolbar

### Step 4: Configure Your API Key

1. Click the Gemini extension icon in your toolbar
2. In the "Gemini API Key" field, paste your API key from Step 1
3. Click **"Save API Key"**
4. You should see a success message

## Testing the Extension

### Test 1: Simple Question

1. Navigate to any webpage (e.g., https://en.wikipedia.org/wiki/Artificial_intelligence)
2. Click the Gemini extension icon
3. In the question box, type: "What is this page about?"
4. Click **"Ask Gemini"**
5. Wait for the response (usually 2-5 seconds)

### Test 2: Content Analysis

1. Visit a news article or blog post
2. Ask: "Can you summarize the main points of this article?"
3. The AI should provide a concise summary

### Test 3: Specific Information

1. Visit a company website or product page
2. Ask: "What products or services are mentioned on this page?"
3. The AI will extract and list the relevant information

## Extension UI Overview

```
┌─────────────────────────────────────────┐
│     🤖 Gemini Webpage Analyzer         │
├─────────────────────────────────────────┤
│                                         │
│  Gemini API Key:                        │
│  ┌───────────────────────────────────┐ │
│  │ ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●● │ │
│  └───────────────────────────────────┘ │
│  [        Save API Key        ]         │
│  Get your free API key from             │
│  Google AI Studio                       │
│                                         │
│  Ask a question about this page:        │
│  ┌───────────────────────────────────┐ │
│  │ What is the main topic of this    │ │
│  │ page?                             │ │
│  └───────────────────────────────────┘ │
│  [          Ask Gemini          ]       │
│                                         │
│  Response:                              │
│  ┌───────────────────────────────────┐ │
│  │ This page discusses artificial    │ │
│  │ intelligence, covering its        │ │
│  │ history, applications, and        │ │
│  │ future implications...            │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Troubleshooting

### Error: "Please enter and save your Gemini API key first"
- **Solution**: Make sure you've entered your API key and clicked "Save API Key"

### Error: "API request failed: 401" or "API request failed: 403"
- **Solution**: Your API key is invalid or expired. Get a new key from Google AI Studio

### Error: "Could not extract page content"
- **Solution**: 
  - Refresh the page and try again
  - Some pages may block content extraction due to security policies
  - Try a different webpage

### Error: "API request failed: 429"
- **Solution**: You've exceeded your API quota. Wait a few minutes or upgrade your API plan

### The extension icon doesn't appear
- **Solution**:
  - Make sure "Developer mode" is enabled
  - Try removing and re-adding the extension
  - Check that all files are present in the extension folder

### No response or endless loading
- **Solution**:
  - Check your internet connection
  - Try a shorter question
  - The page might be too large (extension extracts up to 10,000 characters)

## Example Use Cases

### 1. Research
Ask: "What are the key findings mentioned in this research paper?"

### 2. Shopping
Ask: "What are the main features and price of this product?"

### 3. News
Ask: "Can you give me a brief summary of this news article?"

### 4. Documentation
Ask: "How do I install this software according to this documentation?"

### 5. Legal/Terms
Ask: "What are the main points in these terms of service?"

## Privacy & Security

- Your API key is stored locally in your browser's storage
- Webpage content is sent to Google's Gemini API for analysis
- No data is stored on external servers (except Google's API)
- The extension only accesses the page when you click "Ask Gemini"
- You can revoke your API key at any time from Google AI Studio

## Limitations

- **Content Length**: Only the first 10,000 characters of a page are analyzed
- **API Limits**: Free tier has usage limits (check Google AI Studio for details)
- **Page Types**: JavaScript-heavy or dynamically-loaded content may not be fully captured
- **Rate Limits**: Multiple rapid requests may trigger rate limiting

## Advanced Tips

1. **Be Specific**: Ask targeted questions for better responses
2. **Context Matters**: Questions work best when the answer is clearly on the page
3. **Try Different Phrasings**: If you don't get a good answer, rephrase your question
4. **Combine Queries**: You can ask follow-up questions about the same page
5. **Check the URL**: The extension sends the URL to Gemini for context

## Uninstalling

1. Go to `chrome://extensions/` (or your browser's extension page)
2. Find "Gemini Webpage Analyzer"
3. Click "Remove"
4. Optionally, revoke your API key from Google AI Studio

## Support

If you encounter any issues:
1. Check the browser's console for error messages (F12 → Console tab)
2. Verify your API key is valid
3. Try a different webpage
4. Create an issue on the GitHub repository

## What's Next?

Potential future features:
- Chat history
- Multiple questions in a conversation
- Support for analyzing images on the page
- Custom prompts and templates
- Export responses
- Multi-language support

Enjoy using the Gemini Webpage Analyzer! 🚀
