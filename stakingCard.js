import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0xEB66972a9dc93d01283FA6EaD9d1f21F7262DFAB";
const abi = [ /* ABI smart contract kamu di sini */ ];

function StakingCard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const stakingContract = new ethers.Contract(contractAddress, abi, signer);

        setProvider(provider);
        setContract(stakingContract);
        setAccount(address);
        setWalletConnected(true);
      } else {
        alert("Install MetaMask dulu.");
      }
    };

    connectWallet();
  }, []);

  return (
    <div>
      {walletConnected ? (
        <div>
          <p>Wallet Connected: {account}</p>
          {/* Tambah UI staking di sini */}
        </div>
      ) : (
        <p>Connecting to wallet...</p>
      )}
    </div>
  );
}

export default StakingCard;

