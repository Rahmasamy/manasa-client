import { ReactNode } from "react";

export interface BoxComponentProps {
  title: string;
  description: string;
  icon?: ReactNode; // optional, can be a component or element
  className?: string; // optional extra styling
  footerTitle?: string; // optional footer
  [key: string]: any; // allows passing additional props if needed
}
