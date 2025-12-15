import React from 'react'
import HeaderBanner from '@/src/components/domain/HeaderBanner/HeaderBanner'
import ArticleContent from '@/src/components/domain/ArticleContent/ArticleContent'
import Sidebar from '@/src/components/domain/Sidebar/Sidebar'

export default function SingleMasterResearch() {
  const services = [
    "مراجعة وتدقيق الرسائل إملائياً ولغوياً",
    "تحليل احصائي متقدم باستخدام برنامج SPSS",
    "تنسيق الرسائل وفق أدلة الجامعات المعتمدة",
    "مراجعة المقترحات البحثية (PROPOSAL) وتقديم النصيحة المناسبة",
    "ترجمة أكاديمية (معتمدة) ومتخصصة بعيد عن الذكاء الاصطناعي",
    "تحكيم أدوات البحث وقياس الصدق والثبات",
    "تقديم استشارات علمية وبحثية ترافقك في جميع مراحل إعداد رسالتك"
  ]

  const articleTitle = "كيف يساعدك Genspark Al على جمع المراجع الأكاديمية"
  
  const articleText = `Genspark AI هو أداة ذكية أحدثت ثورة في مجال جمع المراجع الأكاديمية، حيث يوفر آلية متقدمة تلقائية للعثور على الدراسات ذات الصلة بسرعة وكفاءة عالية، متجاوزاً بذلك الطرق التقليدية للبحث اليدوي. تعتمد هذه الأداة على خوارزميات متطورة لاستخراج وفهرسة وربط المصادر الموثوقة بمواضيع البحث بدقة عالية. مع تزايد حجم الأدبيات العلمية، أصبحت أدوات مثل Genspark AI ضرورية لتسريع عملية البحث دون المساس بجودة أو موثوقية المراجع، وسنستعرض في هذا المقال آلياتها وفوائدها وفق معايير البحث العلمي الصارمة.`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <HeaderBanner 
        title="الإرشاد الأكاديمي"
        services={services}
        viewCount={5412}
      />

      {/* Main Content Area */}
      <div className="container mx-auto flex flex-col lg:flex-row bg-white">
        {/* Sidebar - Left */}
        <Sidebar />

        {/* Article Content - Right */}
        <div className="flex-1 min-w-0">
          <ArticleContent
            categoryTitle="إدارة الوقت بذكاء من قاعدة ابدا الآن الي العمل العميق"
            date="11/11/2024"
            author="طارق عفيفي"
            articleTitle={articleTitle}
            articleText={articleText}
          />
        </div>
      </div>
    </div>
  )
}
