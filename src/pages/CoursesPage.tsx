import React, { useState } from 'react';
import { Header } from '../components/Header';
import { FilterSidebar } from '../components/FilterSidebar';
import { CourseGrid } from '../components/CourseGrid';
import { Footer } from '../components/Footer';
import { FilterOptions, SortOption } from '../types';

interface CoursesPageProps {
  courses: any[];
  totalCourses: number;
  sortOption: SortOption;
  filters: FilterOptions;
  savedCourses: string[];
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (searchTerm: string) => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  onSaveCourse: (courseId: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  totalCourses,
  sortOption,
  filters,
  savedCourses,
  onFilterChange,
  onSearch,
  onSortChange,
  onResetFilters,
  onSaveCourse,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={onSearch} />
      
      <main className="flex-grow bg-slate-50 pt-6 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <FilterSidebar
                filters={filters}
                onFilterChange={onFilterChange}
                onResetFilters={onResetFilters}
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
              />
            </div>
            
            {/* Course Grid */}
            <div className="md:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Browse Courses</h1>
                {filters.searchTerm && (
                  <p className="text-slate-600">
                    Search results for "{filters.searchTerm}"
                  </p>
                )}
              </div>
              
              <CourseGrid
                courses={courses}
                totalCourses={totalCourses}
                savedCourses={savedCourses}
                onSaveCourse={onSaveCourse}
                onSortChange={onSortChange}
                currentSort={sortOption}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};