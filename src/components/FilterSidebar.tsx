import React from 'react';
import { FilterOptions, CourseLevel, Provider, PriceFilter } from '../types';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { X, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
  onToggle,
}) => {
  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const subjects = [
    { value: '', label: 'All Subjects' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Psychology', label: 'Psychology' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Music', label: 'Music' },
  ];

  const levels = [
    { value: '', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'All Levels', label: 'All Levels' },
  ];

  const providers = [
    { value: '', label: 'All Providers' },
    { value: 'Coursera', label: 'Coursera' },
    { value: 'edX', label: 'edX' },
    { value: 'Udemy', label: 'Udemy' },
    { value: 'Udacity', label: 'Udacity' },
    { value: 'FutureLearn', label: 'FutureLearn' },
    { value: 'Khan Academy', label: 'Khan Academy' },
    { value: 'Pluralsight', label: 'Pluralsight' },
    { value: 'LinkedIn Learning', label: 'LinkedIn Learning' },
    { value: 'MIT OpenCourseWare', label: 'MIT OpenCourseWare' },
  ];

  const prices = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
  ];

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' },
  ];

  const sidebarClasses = isOpen
    ? 'translate-x-0 opacity-100'
    : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100';

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden flex items-center mb-4">
        <Button 
          onClick={onToggle}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          Filters
        </Button>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        ></div>
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-full md:h-[calc(100vh-5rem)] bg-white z-50 md:z-30 w-80 p-5 shadow-lg md:shadow-none overflow-y-auto transition-all duration-300 ease-in-out transform ${sidebarClasses}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset
            </button>
            <button
              onClick={onToggle}
              className="md:hidden p-1 rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">Subject</h3>
            <Select
              options={subjects}
              value={filters.subject || ''}
              onChange={(value) => updateFilter('subject', value || null)}
              fullWidth
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">Level</h3>
            <Select
              options={levels}
              value={filters.level || ''}
              onChange={(value) => updateFilter('level', value as CourseLevel || null)}
              fullWidth
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">Provider</h3>
            <Select
              options={providers}
              value={filters.provider || ''}
              onChange={(value) => updateFilter('provider', value as Provider || null)}
              fullWidth
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">Price</h3>
            <Select
              options={prices}
              value={filters.price || 'all'}
              onChange={(value) => updateFilter('price', value as PriceFilter || null)}
              fullWidth
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">Language</h3>
            <Select
              options={languages}
              value={filters.language || ''}
              onChange={(value) => updateFilter('language', value || null)}
              fullWidth
            />
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-medium text-slate-800 mb-2">Certificate</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="certificate"
                checked={filters.certificate === true}
                onChange={(e) => updateFilter('certificate', e.target.checked ? true : null)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="certificate" className="ml-2 text-sm text-gray-600">
                Offers Certificate
              </label>
            </div>
          </div>

          <div className="pt-4 md:hidden">
            <Button fullWidth onClick={onToggle}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};