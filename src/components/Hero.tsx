import React from 'react';
import { BookOpen, Search } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onSearch: (searchTerm: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate('/courses');
  };

  const handleTopicClick = (topic: string) => {
    onSearch(topic);
    navigate('/courses');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <BookOpen className="h-16 w-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover Your Perfect Learning Path
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Find and compare thousands of online courses from top providers and institutions.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <Input
              type="text"
              placeholder="Search for courses, subjects, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg text-slate-800 shadow-lg focus:ring-2 focus:ring-blue-400"
              fullWidth
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              Search
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="text-blue-200">Popular:</span>
            {['Data Science', 'Web Development', 'Python', 'Machine Learning', 'Business'].map((topic) => (
              <button 
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};