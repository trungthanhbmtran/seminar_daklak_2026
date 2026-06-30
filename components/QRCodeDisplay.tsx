"use client";

import React from 'react';
import QRCode from 'react-qr-code';
import { FileText } from 'lucide-react';

export default function QRCodeDisplay({ url }: { url: string }) {
    if (!url) return null;
    
    return (
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white sticky top-4 sm:top-8">
            <div className="p-6 sm:p-8 flex flex-col items-center">
                <div className="flex items-center space-x-2 text-indigo-600 mb-6">
                    <FileText className="w-6 h-6" />
                    <h2 className="text-xl font-bold uppercase tracking-wider text-center">
                        Tài liệu Hội thảo
                    </h2>
                </div>

                <p className="text-center text-gray-500 mb-8 text-sm">
                    Quét mã QR bên dưới hoặc bấm nút tải để xem tài liệu dành cho đại biểu.
                </p>

                <div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-100 mb-6">
                    <QRCode
                        value={url}
                        size={180}
                        level="H"
                        className="mx-auto"
                    />
                </div>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-3 px-6 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <FileText className="w-5 h-5" />
                    <span>Xem danh sách tài liệu</span>
                </a>
            </div>
        </div>
    );
}
