import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, FileText, Users, 
  Settings, LogOut, Menu, X 
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <BookOpen size={20} />, label: 'Courses', path: '/admin/courses' },
    { icon: <FileText size={20} />, label: 'Blog Posts', path: '/admin/blog' },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-slate-800">
          <div className="mb-8 px-2 py-3">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-2 py-2 text-base font-medium rounded-lg text-white hover:bg-slate-700"
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}

            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-2 py-2 text-base font-medium rounded-lg text-white hover:bg-slate-700"
            >
              <LogOut size={20} />
              <span className="ml-3">Sign Out</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};