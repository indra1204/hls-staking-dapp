import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const StakingCard = ({ signer, contract }) => {
  const [amount, setAmount] = useState("");
  const [available, setAvailable] = useState("0.0");
  const [staked, setStaked] = useState("0.0");
  const [tvl, setTVL] = useState("0.0");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const address = await signer.getAddress();
      const availableBal = await contract.balanceOf(address);
      const stakedBal = await contract.staked(address);
      const total = await contract.totalStaked();

      setAvailable(ethers.utils.formatEther(availableBal));
      setStaked(ethers.utils.formatEther(stakedBal));
      setTVL(ethers.utils.formatEther(total));
    } catch (err) {
      console.error("Fetch data failed", err);
    }
  };

  const handleStake = async () => {
    if (!amount || isNaN(amount)) return;
    setLoading(true);
    try {
      const parsed = ethers.utils.parseEther(amount);
      const tx = await contract.stake(parsed);
      await tx.wait();
      setAmount("");
      await fetchData();
    } catch (err) {
      console.error("Stake failed", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.card}>
      <h2>Stake HLS</h2>
      <p>Available: {available} HLS</p>
      <p>Your Staked: {staked} HLS</p>
      <p>Total Value Locked: {tvl} HLS</p>
      <input
        type="number"
        value={amount}
        placeholder="Amount to stake"
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleStake} style={styles.button} disabled={loading}>
        {loading ? "Staking..." : "Stake"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    background: "#111",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "400px",
    margin: "20px auto",
    boxShadow: "0 0 20px #6c47ff88",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #6c47ff",
    backgroundColor: "#222",
    color: "white",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6c47ff",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default StakingCard;
