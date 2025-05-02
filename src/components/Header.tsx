import React, { useState } from 'react';
import { Search, Menu, X, Bell } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import { SignInModal } from './auth/SignInModal';
import { SignUpModal } from './auth/SignUpModal';
import { useAuth } from '../lib/auth';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate('/courses');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUpSuccess = () => {
    setIsSignUpModalOpen(false);
    // Optionally show a success message or redirect
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/eduqrator-logo.png" 
              alt="eduQrator" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold text-slate-800">eduQrator</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
              Courses & Programs
            </Link>
            <Link to="/blog" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
              Blogs & Listicles
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-600">
              <Bell className="h-5 w-5" />
            </Button>
            {user ? (
              <Button variant="outline" size="sm" onClick={() => {}}>
                Profile
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsSignInModalOpen(true)}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden py-2 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/courses"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              >
                Courses & Programs
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              >
                Blogs & Listicles
              </Link>
              <div className="pt-4 pb-3 border-t border-slate-200">
                {user ? (
                  <div className="flex items-center px-5">
                    <div className="ml-3">
                      <div className="text-base font-medium text-slate-800">Profile</div>
                      <div className="text-sm font-medium text-slate-500">{user.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 px-2 space-y-1">
                    <Button 
                      variant="outline" 
                      fullWidth 
                      className="justify-start"
                      onClick={() => setIsSignInModalOpen(true)}
                    >
                      Sign In
                    </Button>
                    <Button 
                      fullWidth 
                      className="justify-start mt-2"
                      onClick={() => setIsSignUpModalOpen(true)}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modals */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignUpClick={() => {
          setIsSignInModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSuccess={handleSignUpSuccess}
      />
    </header>
  );
};