"use client";
import React from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

export default function FormTab({ config, handleAddField, handleUpdateField, handleRemoveField, handleMoveField }: any) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Quản lý Form Đăng ký (Form Động)</h3>
                <button
                    type="button"
                    onClick={handleAddField}
                    className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>Thêm trường mới</span>
                </button>
            </div>
            
            <div className="space-y-3">
                {config.fields.map((field: any, index: number) => (
                    <div key={field.id} className="flex flex-col md:flex-row md:items-center gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors">
                        {/* Reorder Buttons */}
                        <div className="flex flex-row md:flex-col items-center space-x-2 md:space-x-0 md:space-y-1">
                            <button type="button" onClick={() => handleMoveField(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">
                                <ChevronUp className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => handleMoveField(index, 'down')} disabled={index === config.fields.length - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Tên hiển thị (Label)</label>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => handleUpdateField(index, 'label', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Mã trường (ID) - Dùng lưu Data</label>
                                <input
                                    type="text"
                                    value={field.id}
                                    onChange={(e) => handleUpdateField(index, 'id', e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                                    placeholder="VD: dien_thoai"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Kiểu dữ liệu (Type)</label>
                                <select
                                    value={field.type}
                                    onChange={(e) => handleUpdateField(index, 'type', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="text">Văn bản (Text)</option>
                                    <option value="tel">Số điện thoại</option>
                                    <option value="email">Email</option>
                                    <option value="autocomplete">Tự động điền (Autocomplete Đơn vị)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pl-2 md:border-l border-gray-200 pt-2 md:pt-0 border-t md:border-t-0 mt-2 md:mt-0">
                            <label className="flex items-center space-x-2 cursor-pointer text-sm">
                                <input
                                    type="checkbox"
                                    checked={field.required}
                                    onChange={(e) => handleUpdateField(index, 'required', e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <span className="text-gray-700">Bắt buộc</span>
                            </label>
                            
                            <button 
                                type="button"
                                onClick={() => handleRemoveField(index)}
                                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xoá trường này"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
