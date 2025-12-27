export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الإرشاد الأكاديمي", href: "/acedemic" },
  { label: "الدورات التدريبية", href: "/courses" },
  { label: "المقالات", href: "/articles" },
  { label: "المكتبة الإلكترونية", href: "/electronic-library" },
  { label: "من نحن", href: "/about" },
];

export const contactInfo = {
  email: "order@hspportal.com",
  whatsapp: "#", // Replace with actual WhatsApp link
};

