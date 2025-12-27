import { BoxComponentProps } from "@/src/types/BoxComponentTypes/BoxComponentTypes";

export const Represntations: BoxComponentProps[] = [
  {
    title: "خدمات الإرشاد الأكاديمي",
    description:
      "نرافقك في رحلتك الأكاديمية بخدمات متكاملة تساعدك على إعداد بحثك العلمي بأعلى معايير الجودة والدقة.",
    icon: (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M49.98 25.4848C50.3977 25.3006 50.7522 24.9978 50.9995 24.6141C51.2469 24.2303 51.3762 23.7824 51.3714 23.3259C51.3667 22.8694 51.2282 22.4243 50.973 22.0457C50.7178 21.6672 50.3571 21.3718 49.9357 21.1962L29.9367 12.0868C29.3287 11.8095 28.6683 11.666 28 11.666C27.3318 11.666 26.6713 11.8095 26.0634 12.0868L6.06668 21.1868C5.65128 21.3688 5.29789 21.6678 5.04974 22.0474C4.80159 22.427 4.66943 22.8707 4.66943 23.3242C4.66943 23.7777 4.80159 24.2214 5.04974 24.6009C5.29789 24.9805 5.65128 25.2796 6.06668 25.4615L26.0634 34.5802C26.6713 34.8575 27.3318 35.001 28 35.001C28.6683 35.001 29.3287 34.8575 29.9367 34.5802L49.98 25.4848Z"
          stroke="#18181B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M51.3334 23.3335V37.3335"
          stroke="#39A975"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 29.1665V37.3332C14 39.1897 15.475 40.9702 18.1005 42.2829C20.726 43.5957 24.287 44.3332 28 44.3332C31.713 44.3332 35.274 43.5957 37.8995 42.2829C40.525 40.9702 42 39.1897 42 37.3332V29.1665"
          stroke="#18181B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    footer: "اعرف المزيد",
    link: "/acedemic",
  },

  {
    title: "خدمات التدريب",
    description:
      "نرافقك في رحلتك الأكاديمية بخدمات متكاملة تساعدك على إعداد بحثك العلمي بأعلى معايير الجودة والدقة.",
    icon: (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="trainingGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#71717A" />
          </linearGradient>
        </defs>
        {/* Presentation Board */}
        <path
          d="M42 14H14C12.8954 14 12 14.8954 12 16V32C12 33.1046 12.8954 34 14 34H42C43.1046 34 44 33.1046 44 32V16C44 14.8954 43.1046 14 42 14Z"
          stroke="url(#trainingGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Board Content Lines */}
        <path
          d="M18 22H38"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          d="M18 26H34"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
        {/* Trainer/Presenter */}
        <circle
          cx="28"
          cy="40"
          r="4"
          stroke="url(#trainingGradient)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M28 44V48"
          stroke="url(#trainingGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M24 46L22 48"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M32 46L34 48"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        {/* Group/Audience Members */}
        <circle
          cx="12"
          cy="42"
          r="3"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.5"
        />
        <circle
          cx="44"
          cy="42"
          r="3"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.5"
        />
        <circle
          cx="8"
          cy="46"
          r="2.5"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.3"
        />
        <circle
          cx="48"
          cy="46"
          r="2.5"
          stroke="url(#trainingGradient)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.3"
        />
      </svg>
    ),
    footer: "اعرف المزيد",
    link: "/courses",
  },
];
