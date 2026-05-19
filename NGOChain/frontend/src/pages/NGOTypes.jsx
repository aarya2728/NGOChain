import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Globe, Users, ShieldAlert, Award, AlertTriangle, Scale } from 'lucide-react';

function NGOTypes() {
  const types = [
    { name: 'Education NGO', icon: BookOpen, desc: 'Empowering children with quality education and educational materials globally.', count: '24 Active' },
    { name: 'Health NGO', icon: Heart, desc: 'Providing free medical camps, hospital assistance, and essential medicines.', count: '38 Active' },
    { name: 'Environmental NGO', icon: Globe, desc: 'Fighting climate change, planting trees, and protecting natural ecosystems.', count: '19 Active' },
    { name: 'Women Empowerment NGO', icon: Users, desc: 'Supporting women entrepreneurs, career skill training, and equal rights initiatives.', count: '29 Active' },
    { name: 'Child Welfare NGO', icon: Award, desc: 'Shelter, nutrition, and care for orphaned and underprivileged youth.', count: '31 Active' },
    { name: 'Animal Welfare NGO', icon: ShieldAlert, desc: 'Rescuing stray animals, providing veterinary care and sanctuary shelters.', count: '16 Active' },
    { name: 'Disaster Relief NGO', icon: AlertTriangle, desc: 'Emergency response, food distribution, and rebuilding after natural disasters.', count: '12 Active' },
    { name: 'Human Rights NGO', icon: Scale, desc: 'Advocating for justice, legal defense, and freedom from oppression worldwide.', count: '22 Active' }
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Explore NGO Categories
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Filter through verified blockchain partners dedicated to distinct global causes. Every donation is fully transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, idx) => {
            const IconComponent = type.icon;
            return (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10 transition-all flex flex-col justify-between group">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-gray-800 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 group-hover:bg-teal-500/20 transition-transform">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors">{type.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{type.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-800/80 pt-4 mt-4">
                  <span className="text-xs text-teal-400 font-mono font-semibold bg-teal-500/10 px-2 py-1 rounded">
                    {type.count}
                  </span>
                  <Link 
                    to={`/ngos?type=${encodeURIComponent(type.name)}`}
                    className="text-xs font-bold text-gray-300 group-hover:text-white flex items-center gap-1 hover:underline"
                  >
                    View NGOs →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NGOTypes;
