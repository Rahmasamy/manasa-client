import React from 'react'
import CourseCard from '../../CourseCardComponent/CourseCardComponent'
import { courses } from '@/src/lib/consts/courses/courses'

export default function NonCompleteCourse() {
  return (
      <div className="w-full py-5">
          <h1>
            الكورسات غيرالمكتملة
        </h1>
          <section className="container mx-auto px-4 py-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id + course.title} course={course} />
            ))}
          </div>
        </section>
        
         </div>
  )
}
