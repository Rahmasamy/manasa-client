// types/Course.ts

interface Section {
  id: string;
  title: string;
  duration: string;
  lectures: number;
  isCompleted?: boolean;
}


export interface Course {
  id: number;
  title: string;
  desc: string;
  duration?: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: string; // e.g., "20% خصم"
  badge?: string;            // optional badge like "الأكثر مبيعاً"
  imageUrl: string;
  platform?: string;  
  instructor: string;
  lectures: number;
  students: number;
  language: string;
  isEnrolled: boolean;
  rating: number;
  sections: Section[];
  // API reference fields
  apiId?: string;
  groupId?: string;
  instructorId?: string;
  // e.g., "by Kitani Studio"
}

export interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateImage: string;
}