import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './contractAddress';
import NGOFundArtifact from '../artifacts/contracts/NGOFund.sol/NGOFund.json';

export const getMetaMaskProvider = () => {
  if (window.ethereum) {
    if (window.ethereum.providers) {
      const metamaskProvider = window.ethereum.providers.find((p) => p.isMetaMask);
      if (metamaskProvider) return metamaskProvider;
    }
    if (window.ethereum.isMetaMask) {
      return window.ethereum;
    }
    return window.ethereum;
  }
  return null;
};

export const connectWallet = async () => {
  const provider = getMetaMaskProvider();
  if (provider) {
    try {
      // Force MetaMask popup window to appear by requesting permissions explicitly
      await provider.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      });
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        alert("MetaMask connection request was cancelled by the user.");
      } else if (error.code === -32002) {
        alert("MetaMask connection request is already pending. Please open MetaMask extension to approve.");
      } else {
        alert("Failed to connect to MetaMask: " + (error.message || error.code));
      }
      return null;
    }
  } else {
    alert("MetaMask is not installed. Please install the MetaMask extension.");
    return null;
  }
};

export const disconnectWallet = () => {
  return true;
};

export const getContract = async (requireSigner = true) => {
  const provider = getMetaMaskProvider();
  if (provider) {
    if (requireSigner) {
      // Ensure accounts are requested and MetaMask is prompted before getting signer
      await provider.request({ method: 'eth_requestAccounts' });
    }
    const browserProvider = new ethers.BrowserProvider(provider);
    if (requireSigner) {
      const signer = await browserProvider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, NGOFundArtifact.abi, signer);
    } else {
      return new ethers.Contract(CONTRACT_ADDRESS, NGOFundArtifact.abi, browserProvider);
    }
  }
  return null;
};

export const fetchBlockchainDonations = async () => {
  try {
    const contract = await getContract(false);
    if (!contract) return [];
    const donations = await contract.getDonations();
    return donations.map(tx => ({
      donor: tx.donor,
      ngoWallet: tx.ngoWallet,
      amount: ethers.formatEther(tx.amount),
      cause: tx.cause,
      timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString()
    }));
  } catch (err) {
    console.error("Error fetching blockchain donations:", err);
    return [];
  }
};

