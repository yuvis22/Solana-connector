import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "./styles.css";

// Import wallet adapter CSS
require("@solana/wallet-adapter-react-ui/styles.css");

function WalletComponent() {
  const { connect, connected, disconnect } = useWallet();
  const [isPhantomAvailable, setIsPhantomAvailable] = useState(false);

  useEffect(() => {
    // Check if Phantom is available
    const checkPhantom = async () => {
      if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          setIsPhantomAvailable(true);
          try {
            // Try to eagerly connect
            await connect();
          } catch (error) {
            console.log("Connection error:", error);
          }
        }
      }
    };
    checkPhantom();
  }, [connect]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Solana Wallet Connector</h1>
      <div className="content">
        {!isPhantomAvailable ? (
          <div>
            <p>Phantom wallet is not installed!</p>
            <button
              onClick={() => window.open("https://phantom.app/", "_blank")}
            >
              Install Phantom
            </button>
          </div>
        ) : !connected ? (
          <div>
            <p>Connect your Phantom wallet to get started</p>
            <button onClick={handleConnect}>Connect Wallet</button>
          </div>
        ) : (
          <div>
            <p>Wallet connected!</p>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const wallets = [new PhantomWalletAdapter()];
  const endpoint = clusterApiUrl("devnet");

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletComponent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
