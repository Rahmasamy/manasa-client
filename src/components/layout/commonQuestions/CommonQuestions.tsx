"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { faqs } from "@/src/lib/consts/FAQ/FAQ";
import { Questionsfilters } from "@/src/lib/consts/filters/Filters";
import QuestionComponent from "../../domain/QuestionComponent/QuestionComponent";

export default function CommonQuestions() {
  // State to track the active filter (default to first category)
  const [activeFilter, setActiveFilter] = useState<string>(Questionsfilters[0]);

  // Filter FAQs based on active category
  const filteredFaqs = faqs.filter((faq) => faq.questionType === activeFilter);

  return (
    <div className="bg-[#D6ECF5] px-4 sm:px-8 lg:px-24 py-8 sm:py-10 bg-gradient-to-br from-[#39A975] to-[#2885AC] flex flex-col gap-4">
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-2 min-w-max">
          {Questionsfilters.map((filter, index) => (
            <Button
              key={filter + index}
              onClick={() => setActiveFilter(filter)}
              className={`hover:text-[#2885AC] py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base whitespace-nowrap snap-start transition-colors ${
                activeFilter === filter
                  ? "text-[#2885AC] bg-white border border-white"
                  : "text-white bg-[transparent] hover:bg-white border border-white"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 sm:gap-4">
        {filteredFaqs.map((item, index) => (
          <QuestionComponent
            questionType={item.questionType}
            questionAnswer={item.questionAnswer}
            questionText={item.questionText}
            id={item.id}
            key={index + item.id}
          />
        ))}
      </div>
    </div>
  );
}
