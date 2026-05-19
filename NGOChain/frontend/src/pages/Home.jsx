import React from 'react';
import { Heart, Globe, Shield, ArrowRight, Zap, CheckCircle2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full relative overflow-hidden py-24 px-6 border-b border-gray-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-gray-950 to-gray-950">
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono mb-4 animate-pulse">
            <Zap size={14} /> Production-Ready Polygon / Ethereum DApp
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-teal-200 to-blue-400 bg-clip-text text-transparent">
            Transparent Crypto Donations <br />for Global Impact.
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            NGOChain eliminates intermediaries, providing 100% verifiable on-chain tracking from donor wallets directly to verified NGO smart contracts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/ngo-types" className="bg-teal-500 text-gray-950 px-8 py-4 rounded-full font-extrabold shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all flex items-center justify-center gap-2 text-base">
              Explore NGO Categories <ArrowRight size={18} />
            </Link>
            <Link to="/register-ngo" className="bg-gray-900 border border-gray-700 px-8 py-4 rounded-full font-bold text-gray-200 hover:bg-gray-800 hover:border-teal-500/50 transition-all text-base">
              Register as NGO
            </Link>
          </div>
          <div className="pt-12 flex flex-wrap justify-center gap-8 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-teal-400" /> Ethers.js v6 BrowserProvider</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-teal-400" /> AI Verification Badge</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-teal-400" /> Immutable EVM Ledger</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col p-8 bg-gray-900 border border-gray-800 rounded-3xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all group">
          <div className="h-14 w-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
            <Shield size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-teal-300 transition-colors">On-Chain Transparency</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Every donation is recorded as an immutable Solidity smart contract event. Track live block confirmations with 100% confidence.
          </p>
        </div>

        <div className="flex flex-col p-8 bg-gray-900 border border-gray-800 rounded-3xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all group">
          <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
            <Globe size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">8 Distinct Categories</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Support Education, Health, Environment, Women Empowerment, Disaster Relief, and Animal Welfare NGOs across the globe.
          </p>
        </div>

        <div className="flex flex-col p-8 bg-gray-900 border border-gray-800 rounded-3xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all group">
          <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
            <Heart size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors">Direct Wallet Impact</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            No bank holds, no administrative cuts. Cryptocurrencies flow instantly to the NGO's multi-sig wallet upon transaction mining.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
