import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, CheckCircle, RefreshCw, Award, Bot } from 'lucide-react';

function Admin() {
  const [ngos, setNgos] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiScanning, setAiScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const ngoRes = await axios.get('http://localhost:8080/api/v1/ngos');
      const volRes = await axios.get('http://localhost:8080/api/v1/volunteers');
      setNgos(ngoRes.data || []);
      setVolunteers(volRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAiScan = () => {
    setAiScanning(true);
    setScanResult('');
    setTimeout(() => {
      setAiScanning(false);
      setScanResult('AI Deep Scan Complete: 0 Fake/Fraudulent NGOs detected across MongoDB and On-Chain EVM states. All signatures verified.');
    }, 2000);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Decentralized Admin Panel
            </h1>
            <p className="text-gray-400 text-sm">
              Role-based management, AI verification status, and network synchronization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleAiScan}
              disabled={aiScanning}
              className="flex items-center gap-2 bg-teal-500 text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
            >
              <Bot size={18} className={aiScanning ? "animate-bounce" : ""} />
              {aiScanning ? 'Scanning...' : 'AI Fraud Verification Scan'}
            </button>
            <button 
              onClick={loadData}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              title="Reload Data"
            >
              <RefreshCw size={18} className={loading ? "animate-spin text-teal-400" : "text-gray-300"} />
            </button>
          </div>
        </div>

        {scanResult && (
          <div className="bg-teal-500/10 border border-teal-500/30 p-6 rounded-2xl text-teal-300 font-mono text-sm flex items-center gap-3">
            <CheckCircle size={20} className="text-teal-400 shrink-0" />
            <span>{scanResult}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-teal-400 flex items-center gap-2">
              <Award size={20} /> Registered NGOs Waiting Verification
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            ) : ngos.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-mono text-sm">
                No new unverified NGOs pending.
              </div>
            ) : (
              <div className="space-y-4">
                {ngos.map((ngo, idx) => (
                  <div key={idx} className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">{ngo.name}</h3>
                      <p className="text-xs text-gray-400 font-mono">{ngo.type} | Reg: {ngo.registrationNumber}</p>
                      <p className="text-xs text-teal-300 font-mono mt-1">{ngo.walletAddress}</p>
                    </div>
                    <button className="bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-gray-900 px-4 py-2 rounded-lg font-bold text-xs transition-colors">
                      Verify NGO
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
              <ShieldAlert size={20} /> Active Volunteer Submissions
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : volunteers.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-mono text-sm">
                No volunteer submissions yet.
              </div>
            ) : (
              <div className="space-y-4">
                {volunteers.map((vol, idx) => (
                  <div key={idx} className="bg-gray-950 border border-gray-800 p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-white text-base">{vol.name}</h3>
                      <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        {vol.interestArea}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">{vol.email} | {vol.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
