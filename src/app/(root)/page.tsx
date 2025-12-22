import CommonQuestions from "@/src/components/layout/commonQuestions/CommonQuestions";
import CoursesSections from "@/src/components/layout/CoursesSection/CoursesSections";
import EductionServices from "@/src/components/layout/EductionServices/EductionServices";
import Hero from "@/src/components/layout/Hero/Hero";
import TestimonialSlider from "@/src/components/layout/Testmonial/TestmonialSlider";
import WhatRepresent from "@/src/components/layout/WhatRepresent/WhatRepresent";

export default function page() {
  return (
    <div>
      <Hero />
      <WhatRepresent />
      <EductionServices />
      <CoursesSections />
      <TestimonialSlider />
      <CommonQuestions />
    </div>
  );
}
