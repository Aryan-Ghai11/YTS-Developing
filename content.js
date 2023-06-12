chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'summarize') {
    const videoTitleElement = document.querySelector('h1.title');
    const videoTitle = videoTitleElement ? videoTitleElement.innerText.trim() : '';
    const transcriptElement = document.querySelector('.transcript-renderer');
    const transcript = transcriptElement ? transcriptElement.innerText.trim() : '';

    const summaryPromise = getSummary(videoTitle, transcript);

    summaryPromise
      .then(summary => {
        sendResponse({ summary: summary });
      })
      .catch(error => {
        sendResponse({ error: 'Error occurred while summarizing.' });
      });

    return true;
  }
});

function getSummary(videoTitle, transcript) {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:5000/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: transcript })
    })
      .then(response => response.json())
      .then(data => {
        resolve(data.summary);
      })
      .catch(error => {
        reject(new Error('Error occurred during summarization.'));
      });
  });
}
