import React from 'react';
import { Course } from '../types';
import { Badge } from './ui/Badge';
import { StarIcon, BookmarkIcon, BookmarkPlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  isSaved?: boolean;
  onSave?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  isSaved = false,
  onSave
}) => {
  const navigate = useNavigate();

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave(course.id);
    }
  };

  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <button 
            onClick={handleSave}
            className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
            aria-label={isSaved ? "Remove from saved courses" : "Save course"}
          >
            {isSaved ? (
              <BookmarkIcon className="w-5 h-5 text-blue-600 fill-blue-600" />
            ) : (
              <BookmarkPlusIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary" className="text-xs">
              {course.provider}
            </Badge>
            {course.isFree && (
              <Badge variant="success" className="text-xs">
                Free
              </Badge>
            )}
            {course.certificate && (
              <Badge variant="secondary" className="text-xs">
                Certificate
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 h-14">
          {course.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({course.reviewCount.toLocaleString()})</span>
        </div>
        <div className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
          {course.description}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{course.level}</Badge>
            <span className="text-gray-500">{course.duration}</span>
          </div>
          <div className="font-medium">
            {course.isFree ? 'Free' : `$${course.price}`}
          </div>
        </div>
      </div>
    </div>
  );
};