"use client";
import React, { useState } from "react";
import { Trash2, AlertTriangle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ClearDataPage() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleDeleteAllData = async () => {
        setIsDeleting(true);
        setMessage(null);
        try {
            const res = await fetch('/api/data', {
                method: 'DELETE',
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setMessage({ type: 'success', text: 'Đã xoá toàn bộ dữ liệu đại biểu thành công!' });
                setShowConfirm(false);
            } else {
                setMessage({ type: 'error', text: data.message || 'Có lỗi xảy ra khi xoá dữ liệu.' });
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            setMessage({ type: 'error', text: 'Lỗi kết nối khi xoá dữ liệu.' });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-2xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link href="/config" className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dọn dẹp dữ liệu</h1>
                        <p className="text-sm text-gray-500 mt-1">Quản lý và xoá dữ liệu của các đợt tập huấn cũ</p>
                    </div>
                </div>
                
                {message && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 shadow-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        <p className="font-medium">{message.text}</p>
                    </div>
                )}

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 rounded-full flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Xoá toàn bộ danh sách đại biểu</h2>
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                Hành động này sẽ xoá sạch danh sách những người đã đăng ký tham gia khỏi hệ thống (làm trống file <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600">result.json</code>). 
                                Bạn nên sử dụng tính năng này khi kết thúc đợt hội thảo cũ và muốn khởi tạo hệ thống trắng tinh cho một đợt tập huấn mới.
                            </p>
                            <p className="text-sm font-semibold text-red-600 mt-2">Lưu ý: Không thể hoàn tác sau khi xoá!</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        {!showConfirm ? (
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md border border-red-200 hover:border-red-600"
                            >
                                <Trash2 className="w-5 h-5" />
                                <span>Xoá tất cả dữ liệu</span>
                            </button>
                        ) : (
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 w-full">
                                <p className="text-base font-medium text-gray-900 mb-4 text-center">Bạn có chắc chắn muốn xoá toàn bộ dữ liệu đại biểu không?</p>
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        onClick={handleDeleteAllData}
                                        disabled={isDeleting}
                                        className="flex items-center space-x-2 px-6 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors shadow-md disabled:opacity-50"
                                    >
                                        {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                        <span>{isDeleting ? 'Đang xoá...' : 'Xác nhận xoá'}</span>
                                    </button>
                                    <button
                                        onClick={() => setShowConfirm(false)}
                                        disabled={isDeleting}
                                        className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium transition-colors shadow-sm"
                                    >
                                        Huỷ bỏ
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
