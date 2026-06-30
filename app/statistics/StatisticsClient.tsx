"use client";

import React, { useState, useMemo } from "react";
import { Users, Search, Download } from "lucide-react";

type FieldConfig = {
    id: string;
    label: string;
    type: string;
    required: boolean;
};

type RegistrationData = {
    id: string;
    createdAt: string;
    [key: string]: string;
};

export default function StatisticsClient({ initialData, fields }: { initialData: RegistrationData[], fields: FieldConfig[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    
    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const filteredData = useMemo(() => {
        return initialData.filter((item) => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            // Search across all dynamic fields
            return fields.some(field => {
                const val = item[field.id];
                return val && val.toLowerCase().includes(term);
            });
        });
    }, [initialData, searchTerm, fields]);

    // Reset trang khi đổi bộ lọc
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, pageSize]);

    // Dữ liệu phân trang
    const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const exportToCsv = () => {
        const headers = ["STT", ...fields.map(f => f.label)];
        const rows = filteredData.map((item, idx) => [
            idx + 1,
            ...fields.map(f => `"${(item[f.id] || "").replace(/"/g, '""')}"`)
        ]);
        
        const csvContent = [
            headers.map(h => `"${h}"`).join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");
        
        // Use BOM to fix Vietnamese display in Excel
        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Danh_sach_dai_bieu_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Thống Kê Danh Sách Đại Biểu
                    </h1>
                    <p className="text-lg text-gray-600">
                        Quản lý và tra cứu thông tin đại biểu tham dự tập huấn
                    </p>
                </div>

                {/* Filters Card */}
                <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-white">
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        {/* Global Search */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 uppercase">Tìm kiếm toàn cục</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Nhập tên, số điện thoại, đơn vị... để tìm kiếm"
                                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-white">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center space-x-2 text-indigo-600">
                            <Users className="w-5 h-5" />
                            <h2 className="font-semibold">Danh sách kết quả ({filteredData.length})</h2>
                        </div>
                        <button
                            onClick={exportToCsv}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                        >
                            <Download className="w-4 h-4" />
                            <span>Xuất Excel/CSV</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="p-4 font-medium whitespace-nowrap w-16 text-center">STT</th>
                                    {fields.map(field => (
                                        <th key={field.id} className="p-4 font-medium whitespace-nowrap">
                                            {field.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                                            <td className="p-4 text-center text-gray-500">{(currentPage - 1) * pageSize + idx + 1}</td>
                                            {fields.map(field => (
                                                <td key={field.id} className="p-4 whitespace-nowrap max-w-[200px] truncate" title={item[field.id] || ""}>
                                                    {item[field.id] || "-"}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={fields.length + 1} className="p-8 text-center text-gray-500">
                                            Không tìm thấy dữ liệu phù hợp với bộ lọc hiện tại.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Phân trang */}
                    {filteredData.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
                            <div className="flex items-center text-sm text-gray-500">
                                Hiển thị
                                <select
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                    className="mx-2 border-gray-200 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 py-1"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                                đại biểu / trang (Tổng {filteredData.length})
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Trước
                                </button>
                                <span className="text-sm text-gray-600 px-2 font-medium">
                                    Trang {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
