import React from 'react';
import { Course, SortOption } from '../types';
import { CourseCard } from './CourseCard';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { Select } from './ui/Select';

interface CourseGridProps {
  courses: Course[];
  totalCourses: number;
  savedCourses?: string[];
  onSaveCourse?: (courseId: string) => void;
  onSortChange: (sort: SortOption) => void;
  currentSort: SortOption;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  totalCourses,
  savedCourses = [],
  onSaveCourse,
  onSortChange,
  currentSort,
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <p className="text-slate-600 mb-4 sm:mb-0">
          Showing <span className="font-medium">{courses.length}</span> of{' '}
          <span className="font-medium">{totalCourses}</span> courses
        </p>
        
        <div className="flex items-center">
          <ArrowUpDown className="mr-2 h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-600 mr-2">Sort by:</span>
          <Select
            options={sortOptions}
            value={currentSort}
            onChange={(value) => onSortChange(value as SortOption)}
            className="w-40"
          />
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isSaved={savedCourses.includes(course.id)}
              onSave={onSaveCourse}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-slate-800 mb-2">No courses found</h3>
          <p className="text-slate-600">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
};