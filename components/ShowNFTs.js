import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

export default function ShowNFTs() {
  const { connection } = useConnection();
  const { publicKey, connected, wallet } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected || !publicKey || !wallet?.adapter) {
      setNfts([]);
      return;
    }

    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const metaplex = new Metaplex(connection);
        const myNfts = await metaplex
          .nfts()
          .findAllByOwner({ owner: publicKey });
        setNfts(myNfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [connection, publicKey, connected, wallet]);

  if (!connected || !wallet?.adapter) {
    return (
      <div className="wallet-message">
        Please connect your wallet to view NFTs
      </div>
    );
  }

  if (loading) {
    return <div className="loading-message">Loading your NFTs...</div>;
  }

  return (
    <div className="nfts-container">
      <h2 className="nfts-heading">Your NFTs</h2>
      <div className="nfts-grid">
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <div key={index} className="nft-card">
              {nft.json?.image && (
                <img
                  src={nft.json.image}
                  alt={nft.name}
                  className="nft-image"
                />
              )}
              <h3 className="nft-name">{nft.name}</h3>
              {nft.json?.description && (
                <p className="nft-description">{nft.json.description}</p>
              )}
            </div>
          ))
        ) : (
          <div className="no-nfts-message">No NFTs found in your wallet</div>
        )}
      </div>
    </div>
  );
}
