import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Building2, ShieldCheck } from 'lucide-react';

function RegisterNGO() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Education NGO',
    registrationNumber: '',
    address: '',
    contact: '',
    walletAddress: '',
    bankAccount: '',
    ifscCode: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Submitting registration details to Go Backend & MongoDB...');

    try {
      await axios.post('http://localhost:8080/api/v1/ngos', formData);
      setStatus('Success! NGO registered successfully. Verification badge pending AI verification audit.');
      setTimeout(() => navigate('/ngos'), 2500);
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Register as NGO Partner</h1>
          <p className="text-gray-400 text-sm">Join the transparent multi-sig smart contract donation pool</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-medium text-left">
          <div>
            <label className="block text-sm text-gray-300 mb-2">NGO Organization Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Global Care Initiative"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">NGO Type / Category</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Govt Registration Number</label>
              <input 
                type="text" 
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="REG-2026-XYZ"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white font-mono text-xs"
                required 
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Contact Email / Phone</label>
              <input 
                type="text" 
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="contact@ngo.org"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Bank Account Number</label>
              <input 
                type="text" 
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="1029384756"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">IFSC / Swift Code</label>
              <input 
                type="text" 
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="HDFC0009123"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Headquarters Address</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="742 Evergreen Terrace..."
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white text-sm"
              rows="3"
              required 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Cryptocurrency Wallet Address (EVM / Polygon)</label>
            <input 
              type="text" 
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white font-mono text-xs"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-gray-900 transition-all shadow-lg ${
              loading ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-teal-500 hover:bg-teal-400 shadow-teal-500/20'
            }`}
          >
            {loading ? 'Submitting to Blockchain/DB...' : 'Register Organization'}
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

export default RegisterNGO;
