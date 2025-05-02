export interface Course {
  id: string;
  title: string;
  provider: Provider;
  instructors: string[];
  price: number;
  isFree: boolean;
  duration: string;
  startDate: string;
  format: string;
  language: string;
  certificate: boolean;
  level: CourseLevel;
  description: string;
  learningOutcomes: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  courseUrl: string;
  subject: string;
  topics: string[];
  featured?: boolean;
}

export type Provider = 
  | 'Coursera'
  | 'edX'
  | 'Udemy'
  | 'Udacity'
  | 'FutureLearn'
  | 'Khan Academy'
  | 'Pluralsight'
  | 'LinkedIn Learning'
  | 'MIT OpenCourseWare';

export type CourseLevel = 
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'All Levels';

export interface User {
  id: string;
  name: string;
  email: string;
  savedCourses: string[];
  inProgress: string[];
  completed: string[];
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterOptions {
  subject: string | null;
  level: CourseLevel | null;
  provider: Provider | null;
  price: PriceFilter | null;
  language: string | null;
  certificate: boolean | null;
  searchTerm: string;
}

export type PriceFilter = 'free' | 'paid' | 'all';

export type SortOption = 
  | 'relevance'
  | 'rating'
  | 'popularity'
  | 'newest';