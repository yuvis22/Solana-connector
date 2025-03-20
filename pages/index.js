import { useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import ShowNFTs from "../components/ShowNFTs";

export default function Home() {
  const [network, setNetwork] = useState("devnet");
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  const handleChange = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <div className="solana-app">
            <div className="main-wrapper">
              <div className="top-bar">
                <h1 className="main-heading">Solana Wallet</h1>
                <WalletMultiButton className="wallet-button" />
                <div className="network-selector">
                  <select
                    value={network}
                    onChange={handleChange}
                    className="network-dropdown"
                  >
                    <option value="devnet">Devnet</option>
                    <option value="mainnet-beta">Mainnet Beta</option>
                    <option value="testnet">Testnet</option>
                  </select>
                </div>
              </div>
              <div className="content-container">
                <ShowNFTs />
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
