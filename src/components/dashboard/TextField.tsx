"use client";


interface TextFieldProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}

export default function TextField({ 
    label, 
    placeholder, 
    value, 
    onChange,
    rows = 1 
}: TextFieldProps) {
    const isTextarea = rows > 1;

    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 ">
                {label}
            </label>
            {isTextarea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] focus:bg-white transition-all text-right"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] focus:bg-white transition-all text-right"
                />
            )}
        </div>
    );
}