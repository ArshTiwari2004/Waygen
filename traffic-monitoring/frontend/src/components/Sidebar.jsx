import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Activity, 
  Camera, 
  AlertTriangle,
  Settings,
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Traffic Map', path: '/map' },
    { icon: Activity, label: 'Live Monitoring', path: '/monitoring' },
    { icon: Camera, label: 'CCTV Feeds', path: '/cctv' },
    { icon: AlertTriangle, label: 'Alerts', path: '/alerts' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-100% w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => window.location.href = '/'}>
        <Map className="w-8 h-8 text-blue-500" />
        <h1 className="text-xl font-bold">WayGen</h1>
      </div>
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;