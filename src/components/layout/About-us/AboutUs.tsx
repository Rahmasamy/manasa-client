import {
  accordionItems,
  valuesData,
  visionMissionData,
} from "@/src/lib/consts/about-us/about-us";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { ValueCard } from "../../domain/ValueCard/ValueCard";
import { AccordionItem } from "../../domain/According/According";

const AboutUs: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          عن الأكاديمية
        </h2>
      </div>
      {/* Header Section */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-right">
            من نحن
          </h1>
          <div className="text-sm font-semibold text-gray-500 text-right leading-relaxed space-y-4">
            <p>
              بوابة العلوم الإنسانية: منصة سعودية نظامية (سجل تجاري رقم
              7051951767) تأسست عام (2009) لتمكين الباحثين والمهنيين أكاديميًا
              ومهاريًا عبر إرشاد أكاديمي متخصص ودورات تدريبية وتطويرية ومهنية
              تُقدَّم بأساليب رقمية حديثة متوافقة مع رؤية المملكة (2030).
            </p>
            <p>
              نضم نخبة من المستشارين والخبراء والمدربين المعتمدين في مختلف
              التخصصات، ونوفّر مسارات تعلم مرنة، وتقارير تقييم دقيقة، وتجربة
              تدريبية تفاعلية عبر نظام إدارة تعلم (LMS) يتيح المتابعة وقياس
              الأثر؛ كما يُعد تنظيم الفعاليات والمؤتمرات والملتقيات العلمية
              والتطويرية من أهم أقسام الشركة ونحرص بكل ما نملك من خبرة علمية
              تُثري المجتمع المعرفي وتدعم الابتكار.
            </p>
          </div>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {visionMissionData.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border-2 border-[#2890bc] p-6"
            >
              <div className="flex items-center  justify-start gap-2 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#2885AC]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-3 text-right"
                  >
                    <div className="w-1.5 h-1.5 bg-[#2885AC] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-md text-gray-500 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-right">
            القيم
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesData.map((value, idx) => (
              <ValueCard
                key={idx}
                title={value.title}
                description={value.content}
              />
            ))}
          </div>
          <a
            href="//www.dmca.com/Protection/Status.aspx?ID=ba92f787-d15d-405e-8fac-f33d53c9e73f"
            title="DMCA.com Protection Status"
            class="dmca-badge"
          >
            
            {" "}
            <img
              src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=ba92f787-d15d-405e-8fac-f33d53c9e73f"
              alt="DMCA.com Protection Status"
            />
          </a>{" "}
          <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js">
            {" "}
          </script>
        </div>
      </div>

      {/* Accordion Section */}
      {/* <div className="py-4 px-6">
        <div className="w-[80%] mx-auto bg-white rounded-lg border border-gray-200 overflow-hidden">
          {accordionItems.map((item, idx) => (
            <AccordionItem
              key={idx}
              title={item}
              isOpen={openAccordion === idx}
              onClick={() => handleAccordionClick(idx)}
            />
          ))}
        </div>
      </div> */}

      {/* About Us Text Section */}
      <div className="py-7 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-right">
            طرق الدفع
          </h2>
          <div className="text-md text-gray-500 text-right leading-relaxed space-y-4">
            <div className="flex justify-center mt-8">
              <img
                src="/mada_1-397167075.jpg"
                alt="Mada and Mastercard logos"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* <h2 className="text-3xl font-bold text-gray-800 mb-6 text-right">ختاما</h2> */}
          {/* <div className="text-md text-gray-500 text-right leading-relaxed space-y-4">
            <p>
              تفخر هذه المؤسسات أن تصدمن لخدمتها المجتمع والمجتمعات الأكاديمية والمعلمية
            </p>
            <p>
              ومجتمعنا هذه المؤسسة الرسمية يعطى المعيار من المؤسسات المتخصصة في الرؤية الحالية وتقنية التقييم المخصص للتعريف بالمشاركات التطويرية
            </p>
            <p>
              ونحن مستمرون باشتراك مجتمعنا على المعلومات مع جهات القبادة المتخصصة للعمليات الممارسة والقيادية
            </p>
            <p>
              ونحن نستخدم استخدام الحماية أو في أي المشاركة والمستخدمة في المشروع، وبالتالي على المشروع، أو معلوماتهم المؤسسة
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
