"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FileText, Home } from "lucide-react";
import Link from "next/link";

const DocumentList = dynamic(() => import("../../components/DocumentList"), { ssr: false });

export default function TaiLieuPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Tài Liệu Hội Thảo
                    </h1>
                    <p className="text-lg text-gray-600">
                        Danh sách các tài liệu và bài tham luận của đại biểu
                    </p>
                </div>

                <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white p-6 sm:p-10">
                    <div className="flex items-center space-x-3 text-indigo-600 mb-8 border-b border-gray-100 pb-4">
                        <FileText className="w-8 h-8" />
                        <h2 className="text-2xl font-bold uppercase tracking-wider">
                            Danh Sách Bài Tham Luận
                        </h2>
                    </div>

                    <DocumentList />

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center space-x-2 py-3 px-8 border border-gray-200 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                        >
                            <Home className="w-5 h-5" />
                            <span>Về trang chủ</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
