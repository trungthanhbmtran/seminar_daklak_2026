"use client";

import React, { useEffect, useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { getDocuments } from "../app/actions/getDocuments";

export default function DocumentList() {
    const [docs, setDocs] = useState<{ name: string, url: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDocuments().then(data => {
            setDocs(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-sm text-gray-500">Đang tải danh sách tài liệu...</p>
            </div>
        );
    }

    if (docs.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 text-sm">
                Không tìm thấy tài liệu nào.
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
            {docs.map((doc, idx) => (
                <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-indigo-50 border border-gray-100 rounded-xl transition-colors group"
                >
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 break-words whitespace-normal" title={doc.name}>
                            {doc.name}
                        </span>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0 ml-2" />
                </a>
            ))}
        </div>
    );
}
