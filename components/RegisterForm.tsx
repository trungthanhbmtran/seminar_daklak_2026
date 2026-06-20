"use client";

import React, { useState, useRef, useEffect } from "react";

import {
    User,
    Briefcase,
    Building2,
    Phone,
    CalendarDays,
    Hotel,
    MessageSquare,
    Send,
    Plus,
    Trash2,
    Users,
    CheckCircle2,
    Plane
} from "lucide-react";


const ORGANIZATIONS = [
    "Tỉnh ủy Đắk Lắk",
    "HĐND tỉnh Đắk Lắk",
    "UBND tỉnh Đắk Lắk",
    "Ủy ban MTTQ Việt Nam tỉnh Đắk Lắk",
    "Sở Khoa học và Công nghệ tỉnh Đắk Lắk",
    "Sở Kế hoạch và Đầu tư tỉnh Đắk Lắk",
    "Sở Thông tin và Truyền thông tỉnh Đắk Lắk",
    "Sở Công Thương tỉnh Đắk Lắk",
    "Sở Nông nghiệp và PTNT tỉnh Đắk Lắk",
    "Sở Tài chính tỉnh Đắk Lắk",
    "Sở Tài nguyên và Môi trường tỉnh Đắk Lắk",
    "Sở Giáo dục và Đào tạo tỉnh Đắk Lắk",
    "Sở Y tế tỉnh Đắk Lắk",
    "Sở Xây dựng tỉnh Đắk Lắk",
    "Sở Giao thông vận tải tỉnh Đắk Lắk",
    "Sở Nội vụ tỉnh Đắk Lắk",
    "Sở Tư pháp tỉnh Đắk Lắk",
    "Sở Văn hóa, Thể thao và Du lịch tỉnh Đắk Lắk",
    "Sở Lao động - Thương binh và Xã hội tỉnh Đắk Lắk",
    "Thanh tra tỉnh Đắk Lắk",
    "Ban Dân tộc tỉnh Đắk Lắk",
    "UBND TP. Buôn Ma Thuột",
    "UBND Thị xã Buôn Hồ",
    "Đại học Tây Nguyên",
    "Hiệp hội Doanh nghiệp tỉnh Đắk Lắk",
    "Liên minh Hợp tác xã tỉnh Đắk Lắk",
    "Bộ Khoa học và Công nghệ",
    "Khác"
];

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

export default function RegisterForm() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        organization: "",
        phone: "",
        arrivalTime: "",
        departureTime: "",
        transportation: "",
        hotel: "",
        otherRequests: "",
        delegates: [{ fullName: "", position: "" }]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDelegateChange = (index: number, field: 'fullName' | 'position', value: string) => {
        const newDelegates = [...formData.delegates];
        newDelegates[index][field] = value;
        setFormData(prev => ({ ...prev, delegates: newDelegates }));
    };

    const addDelegate = () => {
        setFormData(prev => ({
            ...prev,
            delegates: [...prev.delegates, { fullName: "", position: "" }]
        }));
    };

    const removeDelegate = (index: number) => {
        if (formData.delegates.length > 1) {
            const newDelegates = formData.delegates.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, delegates: newDelegates }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Lỗi kết nối. Vui lòng thử lại!");
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white p-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 rounded-full p-4">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Đăng ký thành công!</h3>
                <p className="text-gray-600 mb-8">
                    Cảm ơn bạn đã đăng ký tham dự Hội thảo. Thông tin của đoàn đã được ghi nhận.
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                            organization: "",
                            phone: "",
                            arrivalTime: "",
                            departureTime: "",
                            transportation: "",
                            hotel: "",
                            otherRequests: "",
                            delegates: [{ fullName: "", position: "" }]
                        });
                    }}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Đăng ký đoàn khác
                </button>
            </div>
        );
    }

    return (
        <div className="font-sans">
            <div className="w-full">
                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white">
                    <div className="p-6 sm:p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

                            {/* Group Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {/* Organization */}
                                <div className="space-y-2">
                                    <label htmlFor="organization" className="block text-sm sm:text-base font-medium text-gray-700">Đơn vị (Tên đoàn)</label>
                                    <AutocompleteInput
                                        id="organization"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={(val) => setFormData(prev => ({ ...prev, organization: val }))}
                                        options={ORGANIZATIONS}
                                        placeholder="Chọn hoặc nhập tên đơn vị..."
                                        icon={Building2}
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700">Đầu mối liên hệ (Điện thoại)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200"
                                            placeholder="0912 345 678"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Delegates List */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-indigo-500" />
                                        Danh sách đại biểu tham dự
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addDelegate}
                                        className="inline-flex items-center justify-center px-4 py-2 sm:px-3 sm:py-1.5 border border-transparent text-sm sm:text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors w-full sm:w-auto"
                                    >
                                        <Plus className="w-4 h-4 mr-1 sm:w-5 sm:h-5" />
                                        Thêm đại biểu
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.delegates.map((delegate, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50/50 border border-gray-200 rounded-xl relative group">
                                            {/* Full Name */}
                                            <div className="flex-1 space-y-2">
                                                <label className="block text-sm sm:text-base font-medium text-gray-700">Họ và tên</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={delegate.fullName}
                                                        onChange={(e) => handleDelegateChange(index, 'fullName', e.target.value)}
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200"
                                                        placeholder="Nguyễn Văn A"
                                                    />
                                                </div>
                                            </div>

                                            {/* Position */}
                                            <div className="flex-1 space-y-2">
                                                <label className="block text-sm sm:text-base font-medium text-gray-700">Chức vụ</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Briefcase className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={delegate.position}
                                                        onChange={(e) => handleDelegateChange(index, 'position', e.target.value)}
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200"
                                                        placeholder="Nhập chức vụ..."
                                                    />
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            {formData.delegates.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeDelegate(index)}
                                                    className="absolute -top-2 -right-2 sm:static sm:top-auto sm:right-auto sm:mt-7 p-2 text-red-500 bg-white sm:bg-transparent border border-red-100 sm:border-transparent rounded-full hover:bg-red-50 hover:text-red-700 focus:outline-none transition-colors shadow-sm sm:shadow-none"
                                                    title="Xóa đại biểu"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Time Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4 border-t border-gray-100">
                                {/* Arrival Time */}
                                <div className="space-y-2">
                                    <label htmlFor="arrivalTime" className="block text-sm sm:text-base font-medium text-gray-700">Thời gian đến</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarDays className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            id="arrivalTime"
                                            name="arrivalTime"
                                            value={formData.arrivalTime}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Departure Time */}
                                <div className="space-y-2">
                                    <label htmlFor="departureTime" className="block text-sm sm:text-base font-medium text-gray-700">Thời gian đi</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarDays className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            id="departureTime"
                                            name="departureTime"
                                            value={formData.departureTime}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Accommodation & Transportation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4 border-t border-gray-100">
                                {/* Hotel */}
                                <div className="space-y-2">
                                    <label htmlFor="hotel" className="block text-sm sm:text-base font-medium text-gray-700">Nơi ở (Tên khách sạn)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Hotel className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="hotel"
                                            name="hotel"
                                            value={formData.hotel}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200"
                                            placeholder="KS Sala..."
                                        />
                                    </div>
                                </div>

                                {/* Transportation */}
                                <div className="space-y-2">
                                    <label htmlFor="transportation" className="block text-sm sm:text-base font-medium text-gray-700">Phương tiện di chuyển</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Plane className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            id="transportation"
                                            name="transportation"
                                            value={formData.transportation}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 text-gray-700 appearance-none"
                                        >
                                            <option value="">Chọn phương tiện...</option>
                                            <option value="Máy bay">Máy bay</option>
                                            <option value="Ô tô">Ô tô</option>
                                            <option value="Tàu hoả">Tàu hoả</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Other Requests */}
                            <div className="space-y-2 pt-4 border-t border-gray-100">
                                <label htmlFor="otherRequests" className="block text-sm sm:text-base font-medium text-gray-700">Yêu cầu khác</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <MessageSquare className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        id="otherRequests"
                                        name="otherRequests"
                                        rows={4}
                                        value={formData.otherRequests}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 resize-none"
                                        placeholder="Ghi chú thêm nếu có..."
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center space-x-2 py-4 px-8 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <span>Xác nhận đăng ký</span>
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
