"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, Briefcase, Building2, Phone, Mail, Send, Hash, Text } from "lucide-react";
import { useRouter } from "next/navigation";

type FieldConfig = {
    id: string;
    label: string;
    type: string;
    required: boolean;
};

// Custom Autocomplete Component
const AutocompleteInput = ({
    value,
    onChange,
    options,
    placeholder,
    icon: Icon,
    id,
    name,
    required,
    className
}: {
    value: string;
    onChange: (val: string) => void;
    options: string[];
    placeholder: string;
    icon: React.ElementType;
    id?: string;
    name?: string;
    required?: boolean;
    className?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        onChange(val);
        const filtered = options.filter(opt =>
            opt.toLowerCase().includes(val.toLowerCase())
        );
        setFilteredOptions(filtered);
        setIsOpen(true);
    };

    const handleFocus = () => {
        const filtered = options.filter(opt =>
            opt.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered.length > 0 ? filtered : options);
        setIsOpen(true);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                id={id}
                name={name}
                required={required}
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={`block w-full pl-10 pr-3 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 ${className || 'py-3 rounded-xl'}`}
                placeholder={placeholder}
                autoComplete="off"
            />
            {isOpen && filteredOptions.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {filteredOptions.map((opt, idx) => (
                        <li
                            key={idx}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-50 text-gray-700 text-sm transition-colors border-b border-gray-50 last:border-b-0"
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function RegisterForm({ 
    organizations = [],
    fields = []
}: { 
    organizations?: string[],
    fields?: FieldConfig[]
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Khởi tạo state formData tự động từ danh sách fields
    const initialFormData = fields.reduce((acc, field) => {
        acc[field.id] = "";
        return acc;
    }, {} as Record<string, string>);
    
    const [formData, setFormData] = useState<Record<string, string>>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/documents');
            } else {
                alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Lỗi kết nối. Vui lòng thử lại!");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Hàm tiện ích lấy icon phù hợp cho trường
    const getFieldIcon = (fieldId: string, type: string) => {
        if (fieldId === 'fullName') return User;
        if (fieldId === 'organization') return Building2;
        if (fieldId === 'position') return Briefcase;
        if (fieldId === 'phone') return Phone;
        if (fieldId === 'email') return Mail;
        if (type === 'tel' || type === 'number') return Hash;
        return Text;
    };

    return (
        <div className="font-sans">
            <div className="w-full">
                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white">
                    <div className="p-6 sm:p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            
                            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
                                Thông tin đăng ký
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {fields.map(field => {
                                    const Icon = getFieldIcon(field.id, field.type);
                                    const isFullWidth = field.type === 'autocomplete' || field.id === 'fullName' || field.id === 'position';

                                    return (
                                        <div key={field.id} className={`space-y-2 ${isFullWidth ? 'md:col-span-2' : ''}`}>
                                            <label htmlFor={field.id} className="block text-sm sm:text-base font-medium text-gray-700">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            
                                            {field.type === 'autocomplete' ? (
                                                <AutocompleteInput
                                                    id={field.id}
                                                    name={field.id}
                                                    value={formData[field.id] || ""}
                                                    onChange={(val) => setFormData(prev => ({ ...prev, [field.id]: val }))}
                                                    options={organizations}
                                                    placeholder={`Nhập ${field.label.toLowerCase()}...`}
                                                    icon={Icon}
                                                    required={field.required}
                                                />
                                            ) : (
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Icon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : 'text'}
                                                        id={field.id}
                                                        name={field.id}
                                                        required={field.required}
                                                        value={formData[field.id] || ""}
                                                        onChange={handleChange}
                                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200"
                                                        placeholder={`Nhập ${field.label.toLowerCase()}...`}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center space-x-2 py-4 px-8 border border-transparent rounded-xl shadow-lg text-base font-medium text-white ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1'}`}
                                >
                                    <span>{isSubmitting ? 'Đang xử lý...' : 'Xác nhận đăng ký'}</span>
                                    {!isSubmitting && <Send className="w-5 h-5" />}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
