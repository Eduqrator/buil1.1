import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CoursePage } from './pages/CoursePage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminCoursesPage } from './pages/admin/CoursesPage';
import { AdminBlogPage } from './pages/admin/BlogPage';
import { UsersPage } from './pages/admin/UsersPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { useCourses } from './hooks/useCourses';

function App() {
  const {
    courses,
    totalCourses,
    allCourses,
    sortOption,
    filters,
    savedCourses,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    resetFilters,
    toggleSavedCourse,
  } = useCourses();

  const handleSearchSubmit = (searchTerm: string) => {
    handleSearch(searchTerm);
  };

  const featuredCourses = allCourses.filter(course => course.featured);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <HomePage 
            onSearch={handleSearchSubmit}
            featuredCourses={featuredCourses}
            savedCourses={savedCourses}
            onSaveCourse={toggleSavedCourse}
          />
        } />
        <Route path="/courses" element={
          <CoursesPage 
            courses={courses}
            totalCourses={totalCourses}
            sortOption={sortOption}
            filters={filters}
            savedCourses={savedCourses}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onSortChange={handleSortChange}
            onResetFilters={resetFilters}
            onSaveCourse={toggleSavedCourse}
          />
        } />
        <Route path="/courses/:id" element={<CoursePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;