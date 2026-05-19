import React, { useState } from 'react';
import axios from 'axios';
import { HeartHandshake, CheckCircle } from 'lucide-react';

function Volunteer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestArea: 'Education NGO'
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Submitting application...');

    try {
      await axios.post('http://localhost:8080/api/v1/volunteers', formData);
      setStatus('Success! Thank you for volunteering. An NGO partner will reach out to your contact address.');
      setFormData({ name: '', email: '', phone: '', interestArea: 'Education NGO' });
    } catch (err) {
      console.error(err);
      setStatus('Error: Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HeartHandshake size={32} />
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Volunteer Registration</h1>
          <p className="text-gray-400 text-sm">
            Join the decentralized community and help NGOs on the ground.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-medium">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Full Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Satoshi Nakamoto"
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
              placeholder="satoshi@bitcoin.org"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Contact Number</label>
            <input 
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-teal-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Primary Area of Interest</label>
            <select
              value={formData.interestArea}
              onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
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
            className={`w-full py-4 rounded-xl font-bold text-gray-900 transition-all ${
              loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400 shadow-lg shadow-teal-500/20'
            }`}
          >
            {loading ? 'Submitting...' : 'Register as Volunteer'}
          </button>
        </form>

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

export default Volunteer;
