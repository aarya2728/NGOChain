import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
    walletAddress: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Creating account...');

    try {
      await axios.post('http://localhost:8080/api/v1/auth/register', formData);
      setStatus('Success! Account created successfully.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative text-center">
        <div className="h-16 w-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UserPlus size={32} />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
        <p className="text-gray-400 text-sm mb-8">Join NGOChain decentralized ecosystem</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left font-medium">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Full Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Alice Vance"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Email Address</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alice@example.com"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Select Account Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
            >
              <option value="User">Donor / User</option>
              <option value="NGO">NGO Manager</option>
              <option value="Admin">System Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Ethereum/Polygon Wallet Address (Optional)</label>
            <input 
              type="text"
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white font-mono text-xs"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-gray-900 transition-all ${
              loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400 shadow-lg shadow-teal-500/20'
            }`}
          >
            {loading ? 'Processing...' : 'Register Account'}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-teal-400 hover:underline">Login here</Link>
        </div>

        {status && (
          <div className={`mt-6 p-4 rounded-xl text-xs font-mono text-center ${
            status.includes('Success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
