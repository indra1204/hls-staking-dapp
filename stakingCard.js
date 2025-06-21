import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0x3de3a7a0cacdaff8f725ded46bfc27263c100a16";

// Minimal ABI untuk baca saldo
const abi = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "type": "function",
    "stateMutability": "view"
  }
];

function StakingCard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const connectWalletAndFetchBalance = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const tokenContract = new ethers.Contract(contractAddress, abi, signer);

        setAccount(address);
        setWalletConnected(true);

        try {
          const rawBalance = await tokenContract.balanceOf(address);
          const decimals = await tokenContract.decimals();
          const formatted = ethers.formatUnits(rawBalance, decimals);
          setBalance(formatted);
          console.log("Balance:", formatted);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }
      } else {
        alert("Install MetaMask dulu.");
      }
    };

    connectWalletAndFetchBalance();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {walletConnected ? (
        <div>
          <h3>Wallet: {account}</h3>
          <h4>Saldo HLS: {balance !== null ? `${balance} HLS` : "Loading..."}</h4>
        </div>
      ) : (
        <p>Connecting to wallet...</p>
      )}
    </div>
  );
}

export default StakingCard;

