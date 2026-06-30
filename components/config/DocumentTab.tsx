"use client";
import React from "react";

export default function DocumentTab({ config, handleDocumentChange }: any) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Tài liệu Hội thảo</h3>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-200 space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="show"
                        checked={config.documents?.show ?? false}
                        onChange={handleDocumentChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Hiển thị khối Tài Liệu (Mã QR & Nút xem tài liệu trên trang chủ)</span>
                </label>
                
                <div className="space-y-2 pt-2">
                    <label className="block text-sm font-medium text-gray-600">Đường dẫn tài liệu</label>
                    <input
                        type="text"
                        name="url"
                        value={config.documents?.url || ""}
                        onChange={handleDocumentChange}
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        placeholder="http://..."
                    />
                    <p className="text-xs text-gray-500">Liên kết này sẽ được mã hoá thành QR Code và nút bấm tải về.</p>
                </div>
            </div>
        </div>
    );
}
