import React from "react";
import nextDynamic from "next/dynamic";
import { CalendarDays } from "lucide-react";
import fs from 'fs/promises';
import path from 'path';
import QRCodeDisplay from '../components/QRCodeDisplay';

const RegisterForm = nextDynamic(() => import("../components/RegisterForm"), {
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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  let config: any = {
    title: "ĐĂNG KÝ ĐẠI BIỂU",
    date: "",
    location: "",
    organizations: [] as string[]
  };

  try {
      const filePath = path.join(process.cwd(), 'data', 'config.json');
      const fileContent = await fs.readFile(filePath, 'utf-8');
      config = JSON.parse(fileContent);
  } catch (error) {
      console.error('Failed to read config.json:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-xs sm:text-sm font-bold tracking-wider text-indigo-600 uppercase">
            Đăng Ký Đại Biểu
          </h2>
          <h1 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-extrabold text-gray-900 leading-tight mx-auto max-w-5xl text-balance">
            {config.title}
          </h1>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2.5 sm:py-2 rounded-2xl sm:rounded-full border border-gray-200 shadow-sm mt-4">
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">{config.date}</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-center">{config.location}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={`grid grid-cols-1 ${config.documents?.show ? 'lg:grid-cols-3' : ''} gap-8 items-start`}>
          {/* Left Column: Documents (Conditional) */}
          {config.documents?.show && (
            <div className="hidden lg:block lg:col-span-1 space-y-6">
              <QRCodeDisplay url={config.documents?.url || ""} />
            </div>
          )}

          {/* Right Column: Registration Form */}
          <div className={config.documents?.show ? "lg:col-span-2" : "w-full"}>
            <RegisterForm 
              organizations={config.organizations || []} 
              fields={config.fields || []}
            />
          </div>
        </div>
      </div>

      {/* Admin Config Button */}
      <a 
        href="/config" 
        className="fixed bottom-6 right-6 p-3 bg-white text-gray-500 hover:text-indigo-600 rounded-full shadow-lg border border-gray-200 hover:border-indigo-200 transition-all z-50 group"
        title="Cấu hình hệ thống"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </a>
    </div>
  );
}
