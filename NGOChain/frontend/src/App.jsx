import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NGOList from './pages/NGOList';
import NGOTypes from './pages/NGOTypes';
import NGODetails from './pages/NGODetails';
import RegisterNGO from './pages/RegisterNGO';
import Donate from './pages/Donate';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Volunteer from './pages/Volunteer';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 flex flex-col text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ngos" element={<NGOList />} />
            <Route path="/ngo-types" element={<NGOTypes />} />
            <Route path="/ngo-details/:id" element={<NGODetails />} />
            <Route path="/register-ngo" element={<RegisterNGO />} />
            <Route path="/donate/:id" element={<Donate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-8 px-6 text-center text-xs font-mono">
          <p className="mb-2">NGOChain Decentralized Organization Network • Sepolia EVM Protocol</p>
          <p>© 2026 NGOChain. Built for Transparent Crypto Donations.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
