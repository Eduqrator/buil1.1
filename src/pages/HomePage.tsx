import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { StatsBanner } from '../components/StatsBanner';
import { FeaturedCourses } from '../components/FeaturedCourses';
import { SubjectCategories } from '../components/SubjectCategories';
import { Footer } from '../components/Footer';

interface HomePageProps {
  onSearch: (searchTerm: string) => void;
  featuredCourses: any[];
  savedCourses: string[];
  onSaveCourse: (courseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSearch,
  featuredCourses,
  savedCourses,
  onSaveCourse,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={onSearch} />
      <main className="flex-grow">
        <Hero onSearch={onSearch} />
        <StatsBanner />
        <FeaturedCourses 
          courses={featuredCourses} 
          savedCourses={savedCourses}
          onSaveCourse={onSaveCourse}
        />
        <SubjectCategories />
      </main>
      <Footer />
    </div>
  );
};