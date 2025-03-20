// Background script for handling extension events
chrome.runtime.onInstalled.addListener(() => {
  console.log("Solana Wallet Connector Extension installed");
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CONNECT_WALLET") {
    // Handle wallet connection request
    console.log("Wallet connection requested");
  }
  if (request.type === "WALLET_CHECK") {
    // Forward the check to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "WALLET_CHECK" },
          (response) => {
            sendResponse(response);
          }
        );
      } else {
        sendResponse({ isWalletAvailable: false });
      }
    });
    return true; // Keep the message channel open for async response
  }
  return true;
});
