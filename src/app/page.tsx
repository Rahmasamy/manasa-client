import React from "react";
import Hero from "../components/layout/Hero/Hero";
import WhatRepresent from "../components/layout/WhatRepresent/WhatRepresent";
import EductionServices from "../components/layout/EductionServices/EductionServices";
import CoursesSections from "../components/layout/CoursesSection/CoursesSections";
import TestimonialSlider from "../components/layout/Testmonial/TestmonialSlider";
import CommonQuestions from "../components/layout/commonQuestions/CommonQuestions";

const Page = () => {
  return (
    <main className="relative min-h-screen overflow-hidden  ">
      <Hero />
      <WhatRepresent />
      <EductionServices />
      <CoursesSections />
      <TestimonialSlider />
      <CommonQuestions />
    </main>
  );
};
export default Page;
