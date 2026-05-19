import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connectWallet, disconnectWallet, getMetaMaskProvider } from '../utils/web3';
import { Wallet, LogOut, CheckCircle } from 'lucide-react';

function Navbar() {
  const [walletAddress, setWalletAddress] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const provider = getMetaMaskProvider();
    if (provider) {
      provider.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) setWalletAddress(accounts[0]);
      });
      provider.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress('');
        }
      });
    }
  }, []);

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
      setShowWalletModal(false);
    }
  };

  const handleLogout = () => {
    disconnectWallet();
    setWalletAddress('');
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          NGOChain
        </Link>
        <span className="text-xs bg-gray-800 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full font-mono">
          Polygon Sepolia
        </span>
      </div>
      <div className="hidden lg:flex gap-6 font-medium text-gray-300 text-sm">
        <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
        <Link to="/ngo-types" className="hover:text-teal-400 transition-colors">NGO Types</Link>
        <Link to="/ngos" className="hover:text-teal-400 transition-colors">All NGOs</Link>
        <Link to="/dashboard" className="hover:text-teal-400 transition-colors">Dashboard</Link>
        <Link to="/transactions" className="hover:text-teal-400 transition-colors">Transactions</Link>
        <Link to="/volunteer" className="hover:text-teal-400 transition-colors">Volunteer</Link>
        <Link to="/admin" className="hover:text-teal-400 transition-colors font-semibold text-teal-300">Admin Panel</Link>
      </div>
      <div className="flex gap-3 items-center">
        {walletAddress ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-xs font-mono text-teal-300">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-full transition-colors"
              title="Disconnect Wallet"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowWalletModal(true)}
            className="flex items-center gap-2 bg-teal-500 text-gray-900 px-5 py-2 rounded-full font-bold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 text-sm"
          >
            <Wallet size={16} />
            Connect MetaMask
          </button>
        )}
        <Link 
          to="/login"
          className="px-4 py-2 rounded-full font-semibold border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-sm"
        >
          Login
        </Link>
      </div>

      {showWalletModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] backdrop-blur-md">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative text-white">
            <button 
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-6 text-center text-teal-400">Connect Web3 Wallet</h2>
            <div className="space-y-3">
              <button 
                onClick={handleConnect}
                className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 border border-gray-700 p-4 rounded-xl transition-all shadow-md group"
              >
                <span className="font-semibold text-gray-200 group-hover:text-teal-400 transition-colors">MetaMask Wallet</span>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                  alt="MetaMask" 
                  className="h-8 w-8"
                />
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-6">
              Connect securely via Ethers.js v6 BrowserProvider.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
