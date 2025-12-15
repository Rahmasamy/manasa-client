export interface ValueCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface AccordionItemProps {
  title: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export interface AboutSection {
  title: string;
  content: string;
}
