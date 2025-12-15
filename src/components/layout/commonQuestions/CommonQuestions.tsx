import { Button } from "@/components/ui/button";
import { faqs } from "@/src/lib/consts/FAQ/FAQ";
import { Questionsfilters } from "@/src/lib/consts/filters/Filters";
import QuestionComponent from "../../domain/QuestionComponent/QuestionComponent";

export default function CommonQuestions() {
  return (
    <div className="bg-[#D6ECF5] px-24 py-10 bg-gradient-to-br from-[#39A975] to-[#2885AC] flex flex-col gap-4">
      <div className="flex gap-2 mt-4">
        {Questionsfilters.map((filter, index) => (
          <Button
            key={filter + index}
            className="hover:text-[#2885AC] text-white  bg-[transparent] hover:bg-white border border-white py-3 px-4"
          >
            {filter}
          </Button>
        ))}
         </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          {faqs.map((item, index) => (
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
