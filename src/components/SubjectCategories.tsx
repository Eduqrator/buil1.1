import React from 'react';
import { 
  Code, Database, Palette, BookText, LineChart, 
  Music, Globe, Brain, Calculator, Microscope 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  color: string;
  onClick: () => void;
}

const Category: React.FC<CategoryProps> = ({ icon, title, count, color, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer border border-slate-100"
    >
      <div className={`p-3 rounded-full mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm">{count} courses</p>
    </div>
  );
};

export const SubjectCategories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (subject: string) => {
    navigate(`/courses?subject=${encodeURIComponent(subject)}`);
  };

  const categories = [
    { 
      icon: <Code className="h-6 w-6 text-blue-600" />, 
      title: "Computer Science", 
      count: 2543,
      color: "bg-blue-50" 
    },
    { 
      icon: <Database className="h-6 w-6 text-indigo-600" />, 
      title: "Data Science", 
      count: 1876,
      color: "bg-indigo-50" 
    },
    { 
      icon: <Palette className="h-6 w-6 text-pink-600" />, 
      title: "Design", 
      count: 1254,
      color: "bg-pink-50" 
    },
    { 
      icon: <BookText className="h-6 w-6 text-green-600" />, 
      title: "Business", 
      count: 1987,
      color: "bg-green-50" 
    },
    { 
      icon: <LineChart className="h-6 w-6 text-orange-600" />, 
      title: "Finance", 
      count: 1432,
      color: "bg-orange-50" 
    },
    { 
      icon: <Music className="h-6 w-6 text-red-600" />, 
      title: "Music", 
      count: 874,
      color: "bg-red-50" 
    },
    { 
      icon: <Globe className="h-6 w-6 text-teal-600" />, 
      title: "Languages", 
      count: 1342,
      color: "bg-teal-50" 
    },
    { 
      icon: <Brain className="h-6 w-6 text-purple-600" />, 
      title: "Psychology", 
      count: 986,
      color: "bg-purple-50" 
    },
    { 
      icon: <Calculator className="h-6 w-6 text-sky-600" />, 
      title: "Mathematics", 
      count: 1124,
      color: "bg-sky-50" 
    },
    { 
      icon: <Microscope className="h-6 w-6 text-emerald-600" />, 
      title: "Science", 
      count: 1576,
      color: "bg-emerald-50" 
    },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Browse by Subject</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our extensive catalog of courses across various disciplines and find the perfect match for your learning goals.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Category 
              key={index}
              icon={category.icon}
              title={category.title}
              count={category.count}
              color={category.color}
              onClick={() => handleCategoryClick(category.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};