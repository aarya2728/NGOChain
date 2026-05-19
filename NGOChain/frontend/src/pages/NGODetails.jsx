import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, Building, CreditCard, Hash, CheckCircle, FileText } from 'lucide-react';

function NGODetails() {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch or fallback
    setTimeout(() => {
      setNgo({
        id: id || '1',
        name: 'Global Education Fund',
        type: 'Education NGO',
        registrationNumber: 'NGO-2026-9921-REG',
        walletAddress: '0x1234567890123456789012345678901234567890',
        bankAccount: 'ACC-992819283719',
        ifscCode: 'HDFC0001234',
        smartContractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        description: 'Empowering children with quality education, building schools in rural sectors, and providing free digital literacy tools worldwide. Fully verified partner.',
        isVerified: true,
        totalDonations: '12.4 ETH',
        aiScore: '99.8% (Authentic)'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/ngos" className="text-teal-400 hover:underline text-sm mb-6 inline-block">← Back to All NGOs</Link>
        
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 bg-teal-500/10 text-teal-400 border-l border-b border-teal-500/20 px-6 py-2 rounded-bl-2xl font-mono text-xs flex items-center gap-2">
            <ShieldCheck size={16} />
            AI Verified Badge
          </div>

          <div className="inline-block px-3 py-1 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded-full mb-4 font-mono">
            {ngo.type}
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4">{ngo.name}</h1>
          <p className="text-gray-400 text-base lg:text-lg mb-8 leading-relaxed max-w-3xl">
            {ngo.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-950/60 p-6 rounded-2xl border border-gray-800/80 mb-8 font-mono text-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Hash size={16} className="text-teal-400" />
                <span>Reg No:</span>
                <span className="text-white font-bold">{ngo.registrationNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Building size={16} className="text-teal-400" />
                <span>Bank Acc:</span>
                <span className="text-white">{ngo.bankAccount}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard size={16} className="text-teal-400" />
                <span>IFSC Code:</span>
                <span className="text-white">{ngo.ifscCode}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-teal-400 font-bold">Wallet:</span>
                <span className="text-teal-300 font-mono text-xs">{ngo.walletAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-teal-400 font-bold">Contract:</span>
                <span className="text-teal-300 font-mono text-xs">{ngo.smartContractAddress.substring(0, 12)}...</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-teal-400 font-bold">AI Trust Score:</span>
                <span className="text-green-400 font-bold">{ngo.aiScore}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-teal-500/10 border border-teal-500/20 p-6 rounded-2xl">
            <div>
              <p className="text-xs text-gray-400 font-mono">Total Blockchain Donations</p>
              <p className="text-2xl font-extrabold text-teal-400 font-mono">{ngo.totalDonations}</p>
            </div>

            <Link 
              to={`/donate/${ngo.id}`} 
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 text-gray-900 rounded-full font-bold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 text-lg"
            >
              <Heart size={20} className="fill-current" />
              Donate via MetaMask
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGODetails;
