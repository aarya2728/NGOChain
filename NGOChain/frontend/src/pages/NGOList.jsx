import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Heart, Search, ShieldCheck, ArrowUpRight } from 'lucide-react';

function NGOList() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || '';
  const [searchTerm, setSearchTerm] = useState(typeParam);

  useEffect(() => {
    const fetchNGOs = async () => {
      const defaultNGOs = [
        {
          id: '1',
          name: 'Global Education Fund',
          type: 'Education NGO',
          description: 'Providing education materials, digital devices, and literacy programs to underprivileged youth.',
          walletAddress: '0x123...abc',
          isVerified: true
        },
        {
          id: '2',
          name: 'Green Earth Initiative',
          type: 'Environmental NGO',
          description: 'Planting trees, organizing coastal cleanups, and advocating for climate action.',
          walletAddress: '0x456...def',
          isVerified: true
        },
        {
          id: '3',
          name: 'Health For All',
          type: 'Health NGO',
          description: 'Deploying mobile medical camps and essential medicines in rural sectors.',
          walletAddress: '0x789...ghi',
          isVerified: true
        },
        {
          id: '4',
          name: 'Women Rise Foundation',
          type: 'Women Empowerment NGO',
          description: 'Skill workshops, micro-finance support, and legal advocacy for women.',
          walletAddress: '0x321...fed',
          isVerified: true
        },
        {
          id: '5',
          name: 'Paws & Claws Rescue',
          type: 'Animal Welfare NGO',
          description: 'Emergency shelter, veterinary care, and adoption networks for abandoned animals.',
          walletAddress: '0x654...cba',
          isVerified: true
        },
        {
          id: '6',
          name: 'Disaster Relief Squad',
          type: 'Disaster Relief NGO',
          description: 'Immediate food, clean water, and temporary shelter during natural calamities.',
          walletAddress: '0x987...xyz',
          isVerified: true
        }
      ];

      try {
        const response = await axios.get('http://localhost:8080/api/v1/ngos');
        if (response.data && response.data.length > 0) {
          const backendNGOs = response.data.map((item) => ({
            id: item.id || Math.random().toString(),
            name: item.name,
            type: item.type,
            description: item.address || 'Verified NGO partner on NGOChain.',
            walletAddress: item.walletAddress,
            isVerified: true
          }));
          setNgos([...backendNGOs, ...defaultNGOs]);
        } else {
          setNgos(defaultNGOs);
        }
      } catch (error) {
        console.error("Error fetching NGOs from backend:", error);
        setNgos(defaultNGOs);
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  const filteredNgos = ngos.filter(ngo => 
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ngo.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Verified Blockchain NGOs
            </h1>
            <p className="text-gray-400 text-sm">
              Filter and support fully audited on-chain organizations.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white text-sm shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNgos.map((ngo) => (
              <div key={ngo.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-teal-500/10 text-teal-400 text-xs font-mono font-semibold rounded-full">
                      {ngo.type}
                    </span>
                    {ngo.isVerified && (
                      <span className="flex items-center gap-1 text-xs text-teal-400 font-mono bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                        <ShieldCheck size={14} /> AI Verified
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-teal-300 transition-colors">{ngo.name}</h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{ngo.description}</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-800/80">
                  <div className="flex gap-2">
                    <Link 
                      to={`/donate/${ngo.id}`} 
                      className="flex-1 flex items-center justify-center gap-2 bg-teal-500 text-gray-950 py-3 rounded-xl font-bold hover:bg-teal-400 transition-colors text-sm shadow-lg shadow-teal-500/20"
                    >
                      <Heart size={16} className="fill-current" />
                      Donate
                    </Link>
                    <Link 
                      to={`/ngo-details/${ngo.id}`} 
                      className="px-4 flex items-center justify-center bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 py-3 rounded-xl font-bold transition-colors text-sm"
                      title="View Full Details"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NGOList;
