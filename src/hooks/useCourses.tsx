import { useState, useEffect, useCallback } from 'react';
import { Course, FilterOptions, SortOption } from '../types';
import { courses as allCourses } from '../data/courses';

export const useCourses = () => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCourses);
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [filters, setFilters] = useState<FilterOptions>({
    subject: null,
    level: null,
    provider: null,
    price: null,
    language: null,
    certificate: null,
    searchTerm: '',
  });
  const [savedCourses, setSavedCourses] = useState<string[]>([]);

  // Filter courses based on filters and search term
  const filterCourses = useCallback(() => {
    let result = [...allCourses];

    // Filter by search term
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        course =>
          course.title.toLowerCase().includes(searchTermLower) ||
          course.description.toLowerCase().includes(searchTermLower) ||
          course.topics.some(topic => topic.toLowerCase().includes(searchTermLower)) ||
          course.subject.toLowerCase().includes(searchTermLower)
      );
    }

    // Filter by subject
    if (filters.subject) {
      result = result.filter(course => course.subject === filters.subject);
    }

    // Filter by level
    if (filters.level) {
      result = result.filter(course => course.level === filters.level);
    }

    // Filter by provider
    if (filters.provider) {
      result = result.filter(course => course.provider === filters.provider);
    }

    // Filter by price
    if (filters.price === 'free') {
      result = result.filter(course => course.isFree);
    } else if (filters.price === 'paid') {
      result = result.filter(course => !course.isFree);
    }

    // Filter by language
    if (filters.language) {
      result = result.filter(course => course.language === filters.language);
    }

    // Filter by certificate
    if (filters.certificate) {
      result = result.filter(course => course.certificate);
    }

    return result;
  }, [filters]);

  // Sort courses based on sort option
  const sortCourses = useCallback(
    (courses: Course[]) => {
      const coursesToSort = [...courses];

      switch (sortOption) {
        case 'rating':
          return coursesToSort.sort((a, b) => b.rating - a.rating);
        case 'popularity':
          return coursesToSort.sort((a, b) => b.reviewCount - a.reviewCount);
        case 'newest':
          // Simulating newest since we don't have actual date in our sample data
          return coursesToSort.sort((a, b) => b.id.localeCompare(a.id));
        case 'relevance':
        default:
          // For relevance, we can use a more complex algorithm
          // For now, we'll prioritize featured courses
          return coursesToSort.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return b.rating - a.rating;
          });
      }
    },
    [sortOption]
  );

  // Update filtered courses when filters or sort option changes
  useEffect(() => {
    const filtered = filterCourses();
    const sorted = sortCourses(filtered);
    setFilteredCourses(sorted);
  }, [filters, sortOption, filterCourses, sortCourses]);

  // Handle filter change
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setFilters({
      ...filters,
      searchTerm,
    });
  };

  // Handle sort change
  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      subject: null,
      level: null,
      provider: null,
      price: null,
      language: null,
      certificate: null,
      searchTerm: '',
    });
  };

  // Toggle saved course
  const toggleSavedCourse = (courseId: string) => {
    setSavedCourses(prevSaved => {
      if (prevSaved.includes(courseId)) {
        return prevSaved.filter(id => id !== courseId);
      } else {
        return [...prevSaved, courseId];
      }
    });
  };

  return {
    courses: filteredCourses,
    totalCourses: allCourses.length,
    allCourses,
    sortOption,
    filters,
    savedCourses,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    resetFilters,
    toggleSavedCourse,
  };
};