import React from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Badge } from '../components/ui/Badge';
import { StarIcon, Clock, Award, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CoursePage = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={() => {}} />
      
      <main className="flex-grow bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-96">
              <img 
                src={course.imageUrl} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <Badge variant="primary" className="mb-4">
                    {course.provider}
                  </Badge>
                  <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                  <div className="flex items-center gap-4 text-lg">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      <span>{course.rating.toFixed(1)}</span>
                      <span className="text-slate-300">({course.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {course.level}
                    </div>
                    {course.certificate && (
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Certificate
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex gap-8">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-4">About this course</h2>
                  <p className="text-slate-600 mb-8">{course.description}</p>

                  <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 p-1 bg-blue-100 text-blue-600 rounded-full">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="text-slate-600">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-80 shrink-0">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold mb-4">
                      {course.isFree ? 'Free' : `$${course.price}`}
                    </div>
                    <Button fullWidth className="mb-4">
                      Enroll Now
                    </Button>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {course.duration} of content
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {course.level} level
                      </li>
                      {course.certificate && (
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Certificate of completion
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};