import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContract } from '../utils/web3';
import { ethers } from 'ethers';
import axios from 'axios';
import { Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

function Donate() {
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [cause, setCause] = useState('Education NGO');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const ngo = {
    name: "Global Education Fund",
    walletAddress: "0x1234567890123456789012345678901234567890",
    type: "Education NGO"
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setStatus('Please enter a valid ETH amount.');
      return;
    }

    try {
      setLoading(true);
      setStatus('Connecting Ethers.js BrowserProvider & Signer...');
      
      const contract = await getContract(true);
      if (!contract) {
        setStatus('Failed to connect to MetaMask. Please ensure wallet is active.');
        setLoading(false);
        return;
      }

      setStatus('Please review and confirm transaction popup in MetaMask...');
      
      const tx = await contract.donate(ngo.walletAddress, cause, {
        value: ethers.parseEther(amount)
      });

      setStatus('Transaction submitted! Waiting for block confirmation...');
      const receipt = await tx.wait();
      
      setStatus(`Success! Donated ${amount} ETH. Block Hash confirmed!`);
      
      // Async sync with MongoDB tracking
      try {
        await axios.post('http://localhost:8080/api/v1/donations', {
          donor: receipt.from || '0xDonor',
          ngoWallet: ngo.walletAddress,
          amount: amount,
          cause: cause,
          txHash: tx.hash
        });
      } catch (backendErr) {
        console.warn("MongoDB sync info:", backendErr);
      }

      setAmount('');
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message || 'Transaction rejected by user'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative text-center">
        <div className="h-16 w-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Heart size={32} className="fill-current" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Donate to {ngo.name}</h1>
        <p className="text-teal-400 text-xs font-mono mb-8">Category: {ngo.type}</p>

        <form onSubmit={handleDonate} className="space-y-6 text-left font-medium">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Donation Amount (ETH)</label>
            <div className="relative">
              <input 
                type="number" 
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.1" 
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white font-mono text-lg"
                required
              />
              <span className="absolute right-4 top-3.5 text-teal-400 font-mono text-xs">ETH</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Select Donation Cause</label>
            <select
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
            >
              <option value="Education NGO">Education NGO</option>
              <option value="Health NGO">Health NGO</option>
              <option value="Environmental NGO">Environmental NGO</option>
              <option value="Women Empowerment NGO">Women Empowerment NGO</option>
              <option value="Child Welfare NGO">Child Welfare NGO</option>
              <option value="Animal Welfare NGO">Animal Welfare NGO</option>
              <option value="Disaster Relief NGO">Disaster Relief NGO</option>
              <option value="Human Rights NGO">Human Rights NGO</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-gray-900 transition-all shadow-lg ${
              loading ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-teal-500 hover:bg-teal-400 shadow-teal-500/20'
            }`}
          >
            {loading ? 'Confirming On-Chain...' : `Donate ${amount ? amount + ' ETH' : 'ETH'}`}
          </button>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-xl text-xs font-mono text-left flex items-start gap-3 ${
            status.includes('Success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
            status.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-teal-500/10 text-teal-300 border border-teal-500/20 animate-pulse'
          }`}>
            <ShieldCheck size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{status}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donate;
