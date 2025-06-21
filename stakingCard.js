import React, { useEffect, useState, useCallback } from "react";
import { formatEther, parseEther } from "ethers";

// ...

const fetchData = useCallback(async () => {
  const address = await signer.getAddress();
  const availableBal = await contract.balanceOf(address);
  const stakedBal = await contract.staked(address);
  const total = await contract.totalStaked();

  setAvailable(formatEther(availableBal));
  setStaked(formatEther(stakedBal));
  setTVL(formatEther(total));
}, [signer, contract]);

useEffect(() => {
  fetchData();
}, [fetchData]);

