"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Download, FileText, CalendarDays } from "lucide-react";

const QRCode = dynamic(() => import("react-qr-code"), {
  ssr: false,
  loading: () => <div className="w-[180px] h-[180px] bg-gray-100 rounded-lg animate-pulse mx-auto flex items-center justify-center text-gray-400 text-sm">Đang tải mã QR...</div>
});

const RegisterForm = dynamic(() => import("../components/RegisterForm"), {
  loading: () => (
    <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white p-12 text-center h-[600px] flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
        <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
        <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
      </div>
    </div>
  )
});

export default function Home() {
  const documentUrl = "https://example.com/documents";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-xs sm:text-sm font-bold tracking-wider text-indigo-600 uppercase">
            Đăng Ký & Tài Liệu Đại Biểu
          </h2>
          <h1 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-extrabold text-gray-900 leading-tight mx-auto max-w-5xl text-balance">
            CHUYỂN ĐỔI SỐ VÀ PHÁT TRIỂN HỆ SINH THÁI DOANH NGHIỆP BỀN VỮNG TỈNH ĐẮK LẮK
          </h1>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2.5 sm:py-2 rounded-2xl sm:rounded-full border border-gray-200 shadow-sm mt-4">
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Ngày 26/6/2026</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-center">Trung tâm Hội nghị Pytopia, Tuy Hòa, Đắk Lắk</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Documents */}
          <div className="lg:col-span-1 space-y-6">
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

                <div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-100 mb-8">
                  <QRCode
                    value={documentUrl}
                    size={180}
                    level="H"
                    className="mx-auto"
                  />
                </div>

                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-6 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Download className="w-5 h-5" />
                  <span>Tải tài liệu trực tiếp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-2">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
