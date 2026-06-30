"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import GeneralTab from "../../components/config/GeneralTab";
import FormTab from "../../components/config/FormTab";
import DocumentTab from "../../components/config/DocumentTab";

type FieldConfig = {
    id: string;
    label: string;
    type: string;
    required: boolean;
};

export default function ConfigPage() {
    const [activeTab, setActiveTab] = useState<'general' | 'form' | 'document'>('general');
    
    const [config, setConfig] = useState({
        title: "",
        date: "",
        location: "",
        organizations: [] as string[],
        fields: [
            { id: "fullName", label: "Họ và tên", type: "text", required: true },
            { id: "organization", label: "Đơn vị công tác", type: "autocomplete", required: true },
            { id: "position", label: "Chức vụ", type: "text", required: true },
            { id: "phone", "label": "Số điện thoại", "type": "tel", required: true },
            { id: "email", label: "Email", type: "email", required: false }
        ] as FieldConfig[],
        documents: {
            show: false,
            url: "http://localhost:3000/tailieu"
        }
    });
    const [organizationsText, setOrganizationsText] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setConfig(prev => ({
                        ...prev,
                        ...data.data,
                        fields: data.data.fields || prev.fields,
                        documents: { ...prev.documents, ...data.data.documents }
                    }));
                    setOrganizationsText(data.data.organizations?.join('\n') || "");
                }
            })
            .catch(err => {
                console.error("Failed to load config", err);
                setMessage({ type: 'error', text: 'Không thể tải cấu hình' });
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setConfig(prev => ({
            ...prev,
            documents: {
                ...prev.documents,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleOrganizationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOrganizationsText(e.target.value);
        const orgs = e.target.value.split('\n').map(org => org.trim()).filter(org => org !== "");
        setConfig(prev => ({ ...prev, organizations: orgs }));
    };

    // Field Builder Handlers
    const handleAddField = () => {
        const newId = `field_${Date.now()}`;
        setConfig(prev => ({
            ...prev,
            fields: [...prev.fields, { id: newId, label: "Trường mới", type: "text", required: false }]
        }));
    };

    const handleUpdateField = (index: number, key: keyof FieldConfig, value: any) => {
        setConfig(prev => {
            const newFields = [...prev.fields];
            newFields[index] = { ...newFields[index], [key]: value };
            return { ...prev, fields: newFields };
        });
    };

    const handleRemoveField = (index: number) => {
        setConfig(prev => ({
            ...prev,
            fields: prev.fields.filter((_, i) => i !== index)
        }));
    };

    const handleMoveField = (index: number, direction: 'up' | 'down') => {
        setConfig(prev => {
            const newFields = [...prev.fields];
            if (direction === 'up' && index > 0) {
                [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
            } else if (direction === 'down' && index < newFields.length - 1) {
                [newFields[index + 1], newFields[index]] = [newFields[index], newFields[index + 1]];
            }
            return { ...prev, fields: newFields };
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Đã lưu cấu hình thành công!' });
            } else {
                setMessage({ type: 'error', text: 'Lỗi khi lưu cấu hình' });
            }
        } catch (error) {
            console.error("Save error", error);
            setMessage({ type: 'error', text: 'Lỗi kết nối khi lưu' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Cấu hình hệ thống</h1>
                    <p className="mt-2 text-gray-600">Thay đổi thông tin hiển thị trên trang chủ và form đăng ký</p>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <p className="font-medium">{message.text}</p>
                    </div>
                )}

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-6 sm:p-8 space-y-8">
                    
                    {/* Tabs Navigation */}
                    <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto">
                        <button 
                            type="button"
                            onClick={() => setActiveTab('general')}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'general' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Thông tin chung
                        </button>
                        <button 
                            type="button"
                            onClick={() => setActiveTab('form')}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'form' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Quản lý Form Đăng ký
                        </button>
                        <button 
                            type="button"
                            onClick={() => setActiveTab('document')}
                            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'document' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Tài liệu Hội thảo
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="min-h-[300px]">
                        {activeTab === 'general' && (
                            <GeneralTab 
                                config={config} 
                                handleChange={handleChange} 
                                organizationsText={organizationsText} 
                                handleOrganizationsChange={handleOrganizationsChange} 
                            />
                        )}
                        
                        {activeTab === 'form' && (
                            <FormTab 
                                config={config} 
                                handleAddField={handleAddField}
                                handleUpdateField={handleUpdateField}
                                handleRemoveField={handleRemoveField}
                                handleMoveField={handleMoveField}
                            />
                        )}

                        {activeTab === 'document' && (
                            <DocumentTab 
                                config={config}
                                handleDocumentChange={handleDocumentChange}
                            />
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-white transition-all shadow-lg ${
                                isSaving 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
                            }`}
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>{isSaving ? 'Đang lưu...' : 'Lưu cấu hình'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
