import React, { useState, useEffect } from 'react';
import { getContract, fetchBlockchainDonations, getMetaMaskProvider } from '../utils/web3';
import axios from 'axios';
import { Layers, Activity, DollarSign, Wallet, RefreshCw, CheckCircle, ExternalLink } from 'lucide-react';

function Dashboard() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalNGOs: 12, totalDonationsETH: 15.45, totalTransactions: 24, blockchainStatus: 'Online' });
  const [loading, setLoading] = useState(true);
  const [userWallet, setUserWallet] = useState('Not connected');
  const [filterCause, setFilterCause] = useState('All');

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/v1/analytics');
      if (res.data) setStats(res.data);

      const txs = await fetchBlockchainDonations();
      const mockTxs = [
        { donor: '0x71C...8947', ngoWallet: '0x123...0123', amount: '0.5', cause: 'Education NGO', timestamp: '5 mins ago' },
        { donor: '0x99B...1288', ngoWallet: '0x456...4567', amount: '1.2', cause: 'Health NGO', timestamp: '1 hour ago' },
        { donor: '0x33A...4412', ngoWallet: '0x789...8901', amount: '2.0', cause: 'Disaster Relief NGO', timestamp: '3 hours ago' }
      ];

      setDonations(txs.length > 0 ? txs : mockTxs);

      const provider = getMetaMaskProvider();
      if (provider) {
        const accs = await provider.request({ method: 'eth_accounts' });
        if (accs.length > 0) setUserWallet(accs[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredDonations = filterCause === 'All' 
    ? donations 
    : donations.filter(d => d.cause.includes(filterCause));

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              NGO Manager & Donor Dashboard
            </h1>
            <p className="text-gray-400 text-sm">
              Live cryptographic auditing, protocol health, and balance verification.
            </p>
          </div>
          <button 
            onClick={loadDashboard}
            className="flex items-center gap-2 bg-teal-500 text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh Analytics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between text-teal-400 mb-4">
              <span className="text-xs font-mono">Total Donations</span>
              <DollarSign size={20} />
            </div>
            <p className="text-3xl font-extrabold font-mono">{stats.totalDonationsETH} <span className="text-sm font-normal text-teal-400">ETH</span></p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between text-blue-400 mb-4">
              <span className="text-xs font-mono">Verified NGOs</span>
              <Layers size={20} />
            </div>
            <p className="text-3xl font-extrabold font-mono">{stats.totalNGOs}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between text-purple-400 mb-4">
              <span className="text-xs font-mono">Active Transactions</span>
              <Activity size={20} />
            </div>
            <p className="text-3xl font-extrabold font-mono">{stats.totalTransactions}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between text-green-400 mb-4">
              <span className="text-xs font-mono">Connected Signer</span>
              <Wallet size={20} />
            </div>
            <p className="text-xs font-mono text-gray-300 truncate">{userWallet}</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-xl font-bold">Recent Blockchain Transactions</h2>
            <select
              value={filterCause}
              onChange={(e) => setFilterCause(e.target.value)}
              className="bg-gray-950 border border-gray-800 text-white text-xs px-3 py-2 rounded-lg"
            >
              <option value="All">All Categories</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Disaster">Disaster Relief</option>
              <option value="Environment">Environment</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-sm">
                <thead className="bg-gray-950 text-gray-400 text-xs uppercase border-b border-gray-800/80">
                  <tr>
                    <th className="py-4 px-6">Timestamp</th>
                    <th className="py-4 px-6">Donor</th>
                    <th className="py-4 px-6">NGO Wallet</th>
                    <th className="py-4 px-6 text-right">Amount (ETH)</th>
                    <th className="py-4 px-6">Cause</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-gray-300">
                  {filteredDonations.map((d, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 text-xs text-gray-400">{d.timestamp}</td>
                      <td className="py-4 px-6 text-teal-300">{d.donor.substring(0, 8)}...</td>
                      <td className="py-4 px-6 text-gray-400">{d.ngoWallet.substring(0, 8)}...</td>
                      <td className="py-4 px-6 text-right font-extrabold text-teal-400">{d.amount}</td>
                      <td className="py-4 px-6">
                        <span className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-200">
                          {d.cause}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
