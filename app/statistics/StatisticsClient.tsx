"use client";

import React, { useState, useMemo } from "react";
import { Users, Building2, CalendarDays, Hotel, Search, Plane } from "lucide-react";

type Delegate = {
    fullName: string;
    position: string;
};

type RegistrationData = {
    id: string;
    createdAt: string;
    organization: string;
    phone: string;
    arrivalTime: string;
    departureTime: string;
    transportation?: string;
    hotel: string;
    otherRequests: string;
    // Old schema
    fullName?: string;
    position?: string;
    // New schema
    delegates?: Delegate[];
};

export default function StatisticsClient({ initialData }: { initialData: RegistrationData[] }) {
    const [filterOrg, setFilterOrg] = useState("");
    const [filterTime, setFilterTime] = useState("");
    const [filterHotel, setFilterHotel] = useState("");
    const [filterTrans, setFilterTrans] = useState("");
    const [searchName, setSearchName] = useState("");
    
    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        const parts = dateStr.split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return dateStr;
    };

    const flattenedData = useMemo(() => {
        const flat: any[] = [];
        initialData.forEach((item) => {
            if (item.delegates && item.delegates.length > 0) {
                item.delegates.forEach((del, idx) => {
                    flat.push({
                        ...item,
                        id: `${item.id}-${idx}`,
                        fullName: del.fullName,
                        position: del.position
                    });
                });
            } else {
                // Fallback for old records
                flat.push({
                    ...item,
                    fullName: item.fullName || "Không rõ",
                    position: item.position || ""
                });
            }
        });
        return flat;
    }, [initialData]);

    const filteredData = useMemo(() => {
        return flattenedData.filter((item) => {
            const matchOrg = filterOrg ? (item.organization?.toLowerCase().includes(filterOrg.toLowerCase()) ?? false) : true;
            const matchHotel = filterHotel ? (item.hotel?.toLowerCase().includes(filterHotel.toLowerCase()) ?? false) : true;
            const matchName = searchName ? (item.fullName?.toLowerCase().includes(searchName.toLowerCase()) ?? false) : true;
            const matchTrans = filterTrans ? (item.transportation?.toLowerCase().includes(filterTrans.toLowerCase()) ?? false) : true;

            // For time, if filter is selected, check if it matches arrival or departure
            let matchTime = true;
            if (filterTime) {
                matchTime = item.arrivalTime === filterTime || item.departureTime === filterTime;
            }

            return matchOrg && matchHotel && matchName && matchTime && matchTrans;
        });
    }, [flattenedData, filterOrg, filterTime, filterHotel, filterTrans, searchName]);

    // Reset trang khi đổi bộ lọc
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filterOrg, filterTime, filterHotel, filterTrans, searchName, pageSize]);

    // Dữ liệu phân trang
    const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Get unique values for dropdowns
    const uniqueOrgs = Array.from(new Set(flattenedData.map(d => d.organization).filter(Boolean)));
    const uniqueHotels = Array.from(new Set(flattenedData.map(d => d.hotel).filter(Boolean)));
    const uniqueTrans = Array.from(new Set(flattenedData.map(d => d.transportation).filter(Boolean)));
    const uniqueTimes = Array.from(new Set([
        ...flattenedData.map(d => d.arrivalTime),
        ...flattenedData.map(d => d.departureTime)
    ].filter(Boolean)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Thống Kê Danh Sách Đại Biểu
                    </h1>
                    <p className="text-lg text-gray-600">
                        Quản lý và tra cứu thông tin đại biểu tham dự hội thảo
                    </p>
                </div>

                {/* Filters Card */}
                <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* Search by Name */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 uppercase">Tìm theo tên</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    placeholder="Nhập tên đại biểu..."
                                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 text-sm"
                                />
                            </div>
                        </div>

                        {/* Filter by Org */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 uppercase">Đơn vị</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Building2 className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={filterOrg}
                                    onChange={(e) => setFilterOrg(e.target.value)}
                                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 text-sm appearance-none"
                                >
                                    <option value="">Tất cả đơn vị</option>
                                    {uniqueOrgs.map((org, idx) => (
                                        <option key={idx} value={org}>{org}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Filter by Time */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 uppercase">Thời gian (Đến/Đi)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CalendarDays className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={filterTime}
                                    onChange={(e) => setFilterTime(e.target.value)}
                                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 text-sm appearance-none"
                                >
                                    <option value="">Tất cả thời gian</option>
                                    {uniqueTimes.sort().map((time, idx) => (
                                        <option key={idx} value={String(time)}>{formatDate(String(time))}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Filter by Hotel */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 uppercase">Nơi ở</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Hotel className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={filterHotel}
                                    onChange={(e) => setFilterHotel(e.target.value)}
                                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 text-sm appearance-none"
                                >
                                    <option value="">Tất cả nơi ở</option>
                                    {uniqueHotels.map((hotel, idx) => (
                                        <option key={idx} value={hotel}>{hotel}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Filter by Transportation */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 uppercase">Phương tiện</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Plane className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={filterTrans}
                                    onChange={(e) => setFilterTrans(e.target.value)}
                                    className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 text-sm appearance-none"
                                >
                                    <option value="">Tất cả phương tiện</option>
                                    {uniqueTrans.map((trans, idx) => (
                                        <option key={idx} value={String(trans)}>{String(trans)}</option>
                                    ))}
                                </select>
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
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="p-4 font-medium whitespace-nowrap">Họ và tên</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Chức vụ</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Đơn vị</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Điện thoại</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Ngày đến</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Ngày đi</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Phương tiện</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Nơi ở</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Yêu cầu khác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((item) => (
                                        <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{item.fullName}</td>
                                            <td className="p-4">{item.position}</td>
                                            <td className="p-4 min-w-[150px] whitespace-normal break-words">{item.organization}</td>
                                            <td className="p-4">{item.phone}</td>
                                            <td className="p-4">{formatDate(item.arrivalTime)}</td>
                                            <td className="p-4">{formatDate(item.departureTime)}</td>
                                            <td className="p-4">
                                                {item.transportation ? (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium whitespace-normal text-center">
                                                        {item.transportation}
                                                    </span>
                                                ) : "-"}
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium whitespace-normal text-center">
                                                    {item.hotel || "Không có"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 min-w-[200px] whitespace-normal break-words">{item.otherRequests || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="p-8 text-center text-gray-500">
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
                                    <option value={2}>2</option>
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
