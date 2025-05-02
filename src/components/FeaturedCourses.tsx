import React from 'react';
import { CourseCard } from './CourseCard';
import { Course } from '../types';

interface FeaturedCoursesProps {
  courses: Course[];
  savedCourses?: string[];
  onSaveCourse?: (courseId: string) => void;
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ 
  courses, 
  savedCourses = [],
  onSaveCourse
}) => {
  // Filter courses that are marked as featured
  const featuredCourses = courses.filter(course => course.featured);

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Featured Courses</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hand-picked courses recommended by our editorial team to help you start your learning journey.
          </p>
        </div>

        {featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isSaved={savedCourses.includes(course.id)}
                onSave={onSaveCourse}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-600">No featured courses available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <a 
            href="/courses" 
            className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
          >
            View all courses
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};