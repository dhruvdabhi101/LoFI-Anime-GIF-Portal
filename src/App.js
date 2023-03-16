import React, { useEffect, useState } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  "https://media.giphy.com/media/RMwgs5kZqkRyhF24KK/giphy.gif",
  "https://media.giphy.com/media/XbJYBCi69nyVOffLIU/giphy.gif",
  "https://media.giphy.com/media/CW16nFVXLSQxSMUEMd/giphy-downsized-large.gif",
  "https://media.giphy.com/media/CW16nFVXLSQxSMUEMd/giphy-downsized-large.gif",
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with public key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } else {
      alert("Solana object not found! Get a phantom wallet");
    }
  };
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connected with public key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input type="text" placeholder="Enter gif link" />
        <button type="submit" className="cta-button submit-gif-button">
          {" "}
          Submit{" "}
        </button>
      </form>
      <div className="gif-grid">
        {TEST_GIFS.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 LoFi Anime Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {/* Render your connect to wallet */}
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
