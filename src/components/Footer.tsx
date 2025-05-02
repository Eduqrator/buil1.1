import React from 'react';
import { Mail, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/eduqrator-logo.png" alt="eduQrator" className="h-8 w-auto" />
              <span className="text-xl font-bold">eduQrator</span>
            </div>
            <p className="text-slate-300 text-sm">
              Your personalized learning companion, helping you discover the perfect courses to achieve your academic and career goals.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white text-sm">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white text-sm">FAQ</Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-300 hover:text-white text-sm">Blog</Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-300 hover:text-white text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-white text-sm">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=computer-science" className="text-slate-300 hover:text-white text-sm">Computer Science</Link>
              </li>
              <li>
                <Link to="/courses?category=data-science" className="text-slate-300 hover:text-white text-sm">Data Science</Link>
              </li>
              <li>
                <Link to="/courses?category=web-development" className="text-slate-300 hover:text-white text-sm">Web Development</Link>
              </li>
              <li>
                <Link to="/courses?category=business" className="text-slate-300 hover:text-white text-sm">Business</Link>
              </li>
              <li>
                <Link to="/courses?category=psychology" className="text-slate-300 hover:text-white text-sm">Psychology</Link>
              </li>
              <li>
                <Link to="/courses?category=design" className="text-slate-300 hover:text-white text-sm">Design</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-300 text-sm mb-4">
              Subscribe to our newsletter to receive updates on new courses and learning resources.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                fullWidth
              />
              <Button variant="secondary" className="w-full group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 eduQrator. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <Link to="/terms" className="hover:text-white">Terms</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">Privacy</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};