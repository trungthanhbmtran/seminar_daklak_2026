"use client";
import React from "react";

export default function GeneralTab({ config, handleChange, organizationsText, handleOrganizationsChange }: any) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Thông tin chung</h3>
            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tiêu đề hội thảo / tập huấn</label>
                <input
                    type="text"
                    name="title"
                    value={config.title}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Thời gian (VD: Ngày 03/7/2026)</label>
                    <input
                        type="text"
                        name="date"
                        value={config.date}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
                    <input
                        type="text"
                        name="location"
                        value={config.location}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Danh sách Đơn vị công tác (Mỗi đơn vị một dòng)
                </label>
                <textarea
                    rows={6}
                    value={organizationsText}
                    onChange={handleOrganizationsChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 resize-y"
                    placeholder="Nhập tên đơn vị..."
                />
            </div>
        </div>
    );
}
