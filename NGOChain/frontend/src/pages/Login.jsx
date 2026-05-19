import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Logging in...');

    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', formData);
      setStatus('Success! Welcome back.');
      localStorage.setItem('token', res.data.token);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative text-center">
        <div className="h-16 w-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LogIn size={32} />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm mb-8">Login to manage your decentralized organization</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left font-medium">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-gray-900 transition-all ${
              loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400 shadow-lg shadow-teal-500/20'
            }`}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-teal-400 hover:underline font-bold">Sign up</Link>
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

export default Login;
