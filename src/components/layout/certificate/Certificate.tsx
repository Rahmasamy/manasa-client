'use client'
import { singleCertificate } from "@/src/lib/consts/courses/courses";
import { CertificateData } from "@/src/types/courses/courses";
import { Download, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CertificateCompletionPage: React.FC = () => {
  const [certificate] = useState<CertificateData>(singleCertificate);

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificate.certificateImage;
    link.download = `certificate_${certificate.studentName}_${certificate.completionDate}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-36" >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
         
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مبروووك! تم اكمال الكورس بنجاح
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            احسنت! انت الان تمتلك شهادة إتمام الكورس ونتمنى لك التوفيق وتمتع
            بكافة معلوماتك التي حصلت عليها من الكورس المتكامل بنجاح مستمر
          </p>
        </div>

        {/* Certificate Image */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 p-6">
          <div className="relative group">
            <Image
              src={certificate.certificateImage}
              alt="Certificate of Completion"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg shadow-md transition-transform group-hover:scale-[1.02]"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
              <button
                onClick={handleDownload}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 px-6 py-3 rounded-lg shadow-lg font-semibold flex items-center gap-2 hover:bg-gray-50"
              >
                <Download className="w-5 h-5" />
                معاينة كاملة
              </button>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className=" flex w-full items-center justify-end mb-8">
          <button
            onClick={handleDownload}
            className="inline-flex items-center  gap-2 bg-[#2885AC] hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            تنزيل الشهادة PDF
          </button>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900  mb-4">
            ماذا عن تقييمك للكورس
          </h3>
          <div className="flex items-center justify-start gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="transition-transform hover:scale-110"
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`w-10 h-10 cursor-pointer transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-teal-600 font-semibold">
              شكراً لتقييمك! ({rating} من 5)
            </p>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">اضف تعليقاتك</h3>
          <textarea
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            placeholder="اضف تعليقاتك..."
          />
          <div className="mt-4 flex justify-end">
            <button className="bg-[#2885AC] hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              إرسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCompletionPage;
