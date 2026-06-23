"use client";

import React from "react";
import QRCode from "react-qr-code";
import { CheckCircle2, Download, Home, FileText } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function DocumentsPage() {
    const documentUrl = "http://103.159.48.203/FTPsite/TAILIEU_THAMLUAN/";
    const qrUrl = typeof window !== "undefined" ? `${window.location.origin}/tailieu` : "http://localhost:3000/tailieu";

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
            <div className="max-w-xl w-full">
                {/* Success Message */}
                <div className="text-center mb-10 space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 rounded-full p-4">
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Đăng ký thành công!
                    </h1>
                    <p className="text-lg text-gray-600">
                        Cảm ơn bạn đã đăng ký tham dự Hội thảo. Dưới đây là tài liệu dành cho đại biểu.
                    </p>
                </div>

                {/* QR Code Card */}
                <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white">
                    <div className="p-8 sm:p-12 flex flex-col items-center">
                        <div className="flex items-center space-x-2 text-indigo-600 mb-6">
                            <FileText className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider">
                                Tài liệu Hội thảo
                            </h2>
                        </div>

                        <p className="text-center text-gray-500 mb-8 max-w-sm">
                            Vui lòng sử dụng ứng dụng camera trên điện thoại hoặc Zalo để quét mã QR bên dưới để tải tài liệu.
                        </p>

                        <div className="bg-white p-6 rounded-2xl shadow-inner border border-gray-100 mb-6">
                            <QRCode
                                value={qrUrl}
                                size={200}
                                level="H"
                                className="mx-auto"
                            />
                        </div>

                        <div className="w-full space-y-4">
                            <Link
                                href="/tailieu"
                                className="w-full flex items-center justify-center space-x-2 py-4 px-8 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <FileText className="w-5 h-5" />
                                <span>Xem danh sách tài liệu</span>
                            </Link>

                            <Link
                                href="/"
                                className="w-full flex items-center justify-center space-x-2 py-4 px-8 border border-gray-200 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                            >
                                <Home className="w-5 h-5" />
                                <span>Về trang chủ</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
