document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('summarize-button');
  const summaryPlaceholder = document.getElementById('summary-placeholder');

  button.addEventListener('click', function() {
    button.innerText = 'Summarizing...';
    button.disabled = true;

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { action: 'summarize' }, function(response) {
        if (chrome.runtime.lastError) {
          // Handle any runtime error
          summaryPlaceholder.innerText = 'Error occurred while summarizing.';
        } else if (response && response.summary) {
          // Display the summary
          summaryPlaceholder.innerText = response.summary;
        } else {
          // Handle other cases
          summaryPlaceholder.innerText = 'Error occurred while summarizing.';
        }

        button.innerText = 'Summarize';
        button.disabled = false;
      });
    });
  });
});
