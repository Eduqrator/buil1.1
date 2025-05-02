import React from 'react';
import { BookOpen, Users, Award, BarChart } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
      title: '10,000+',
      description: 'Online Courses'
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: '5M+',
      description: 'Learners'
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: '300+',
      description: 'Certifications'
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-600" />,
      title: '50+',
      description: 'Course Providers'
    }
  ];

  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-3">{stat.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{stat.title}</h3>
              <p className="text-slate-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};