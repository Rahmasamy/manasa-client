export interface DashboardTableRow {
  id: number;
  title: string;
  type: string;
  views: number;
  status: "مفعل" | "موقوف";
  date: string;
}
export interface ServiceFormData {
    // Background Section
    backgroundImage: string | null;
    
    // Main Title Section
    mainTitle: string;
    mainSubtitle: string;
    
    // About Service Section
    aboutTitle: string;
    aboutDescription: string;
    aboutImage: string | null;
    
    // Service Details Section
    detailsTitle: string;
    detailsDescription: string;
    detailsImage: string | null;
    
    // Service Advantages Section
    advantages: string[];
    
    // Download Section
    downloadTitle: string;
    downloadDescription: string;
    downloadFiles: File[];
}