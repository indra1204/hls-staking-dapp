import { useEffect, useState } from "react";
import { ethers } from "ethers";
import StakingCard from "./components/StakingCard";

// Alamat kontrak staking kamu di Helios
const CONTRACT_ADDRESS = "0xEB66972a9dc93d01283FA6EaD9d1f21F7262DFAB";

// Contoh ABI minimal — GANTI jika kamu punya ABI asli
const ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function staked(address) view returns (uint256)",
  "function totalStaked() view returns (uint256)",
  "function stake(uint256) external",
];

function App() {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask or Helios Wallet!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      setSigner(signer);
      setContract(contract);
    };

    init();
  }, []);

  return (
    <div className="App" style={{ padding: "2rem", background: "#000", minHeight: "100vh", color: "white" }}>
      <h1>HLS Staking dApp</h1>
      {signer && contract ? (
        <StakingCard signer={signer} contract={contract} />
      ) : (
        <p>Connecting to wallet...</p>
      )}
    </div>
  );
}

export default App;

