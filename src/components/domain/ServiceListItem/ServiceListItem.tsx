import { Check } from "lucide-react";
import React from "react";

interface ServiceListItemProps {
  text: string;
}

export default function ServiceListItem({ text }: ServiceListItemProps) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div className="flex-shrink-0 mt-1">
        <Check className="w-5 h-5 text-white" />
      </div>
      <p className="text-white font-medium text-base leading-relaxed">{text}</p>
    </div>
  );
}

