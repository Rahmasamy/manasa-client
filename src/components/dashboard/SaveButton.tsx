"use client";

interface SaveButtonProps {
    onClick: () => void;
    loading?: boolean;
    text?: string;
}

export default function SaveButton({ 
    onClick, 
    loading = false,
    text = 'حفظ' 
}: SaveButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="px-12 py-3 bg-[#2885AC] text-white rounded-lg font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'جاري الحفظ...' : text}
        </button>
    );
}