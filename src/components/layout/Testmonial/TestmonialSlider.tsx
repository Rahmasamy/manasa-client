
"use client"
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { testimonials } from '@/src/lib/consts/testmonial/testmonial';
import { TestimonialCard } from '../../domain/TestmonialComponent/TestmonialCard';

export default function TestimonialSlider() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      direction: 'rtl',
      slidesToScroll: 1,
      dragFree: true
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-2 sm:mb-3">
          آراء العملاء
        </h2>
        <p className="text-gray-600 text-center text-base sm:text-lg">
          ماذا يقول عملاؤنا عن تجربتهم معنا
        </p>
      </div>

      <div className="overflow-hidden my-5" ref={emblaRef}>
        <div className="flex gap-6">
          {/* Loop through testimonials twice for seamless infinite scroll */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] xl:flex-[0_0_calc(25%-18px)]"
            >
              <TestimonialCard
                id={testimonial.id}
                name={testimonial.name}
                title={testimonial.title}
                image={testimonial.image}
                rating={testimonial.rating}
                text={testimonial.text}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          مرر الماوس على البطاقة للإيقاف المؤقت
        </p>
      </div>
    </div>
  );
}