chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'summarize') {
    const apiUrl = 'http://127.0.0.1:5000/summary';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: message.transcript })
    })
      .then(response => response.json())
      .then(data => {
        if (data.summary) {
          sendResponse({ summary: data.summary });
        } else {
          sendResponse({ error: 'Error occurred while summarizing.' });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ error: error.message });
      });

    return true;
  }
});
