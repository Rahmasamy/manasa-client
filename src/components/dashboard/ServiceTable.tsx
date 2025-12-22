"use client";
export interface ServiceItem {
    id: string;
    name: string;
    servicesCount: number;
}
interface ServiceTableProps {
    items: ServiceItem[];
    onDelete: (id: string) => void;
    onView: (id: string) => void;
    serviceHeadline?:string;
}

export default function ServiceTable({serviceHeadline, items, onDelete, onView }: ServiceTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-gray-200">
                        <th className="px-6 py-4 text-right text-lg font-bold text-gray-700">
                            أسم القسم
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-bold text-gray-700">
                            عدد {serviceHeadline? serviceHeadline : 'الخدمات'}
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-bold text-gray-700">
                            {/* Actions column */}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr 
                            key={item.id} 
                            className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 text-right text-gray-700">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-700">
                                {item.servicesCount}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onView(item.id)}
                                        className="px-10 py-3 text-sm font-medium text-[#0A66C2] border border-[#0A66C2]  rounded-lg hover:bg-teal-50 transition-colors"
                                    >
                                        عرض
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="px-10 py-3 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}