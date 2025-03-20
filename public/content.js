// Content script that runs on web pages
console.log("Solana Wallet Connector content script loaded");

// Check for wallet availability
function checkWallet() {
  return new Promise((resolve) => {
    if (window.solana) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_PAGE_INFO") {
    // Send page information back to the extension
    sendResponse({
      url: window.location.href,
      title: document.title,
    });
  } else if (request.type === "WALLET_CHECK") {
    checkWallet().then((isAvailable) => {
      sendResponse({ isWalletAvailable: isAvailable });
    });
    return true; // Keep the message channel open for async response
  }
  return true;
});
