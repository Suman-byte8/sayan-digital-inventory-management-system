'use client';

import {
    MdStorefront,
    MdAddPhotoAlternate,
    MdContactMail,
    MdMail,
    MdCall,
    MdPublic,
    MdNotificationsActive,
    MdSettings,
    MdGroup,
    MdNotifications,
    MdExtension,
    MdSave,
    MdSearch,
    MdDelete
} from 'react-icons/md';
import { useSettings } from '@/context/SettingsContext';
import { useState, useEffect, useRef } from 'react';

export default function SettingsPage() {
    const { settings, loading, updateSettings } = useSettings();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        shopName: '',
        taxId: '',
        address: '',
        email: '',
        phone: '',
        currency: 'INR',
        timezone: 'Asia/Kolkata'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (settings) {
            setFormData({
                shopName: settings.shopName || '',
                taxId: settings.taxId || '',
                address: settings.address || '',
                email: settings.email || '',
                phone: settings.phone || '',
                currency: settings.currency || 'INR',
                timezone: settings.timezone || 'Asia/Kolkata'
            });
        }
    }, [settings]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage({ type: '', text: '' });
        try {
            await updateSettings(formData);
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update settings.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleLogoClick = () => {
        fileInputRef.current?.click();
    };

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsSaving(true);
        setMessage({ type: '', text: '' });

        const logoFormData = new FormData();
        logoFormData.append('logo', file);

        try {
            await updateSettings(logoFormData);
            setMessage({ type: 'success', text: 'Logo updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update logo.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleRemoveLogo = async () => {
        if (!confirm('Are you sure you want to remove the logo?')) return;

        setIsSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await updateSettings({ logoUrl: '' });
            setMessage({ type: 'success', text: 'Logo removed successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to remove logo.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    if (loading) {
        return <div className="flex-1 flex items-center justify-center">Loading settings...</div>;
    }

    return (
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 overflow-y-auto">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoChange}
                className="hidden"
                accept="image/*"
            />
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">Application Settings</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Manage your shop details, team access, and system preferences.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-3 h-8 rounded-lg border border-slate-200 bg-surface-light text-slate-900 font-medium text-xs hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-3 h-8 rounded-lg bg-primary text-white font-bold text-xs hover:bg-blue-700 shadow-sm shadow-primary/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                        <MdSave className="text-[16px]" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {message.text && (
                <div className={`mb-6 p-3 rounded-lg text-xs font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {/* Tabs Navigation */}
            <div className="border-b border-slate-200 mb-6 overflow-x-auto">
                <div className="flex gap-6 min-w-max">
                    <button className="pb-2 border-b-[2px] border-primary text-primary font-bold text-xs flex items-center gap-1.5">
                        <MdSettings className="text-[16px]" />
                        General
                    </button>
                    <button className="pb-2 border-b-[2px] border-transparent text-slate-500 hover:text-slate-900 font-medium text-xs flex items-center gap-1.5 transition-colors">
                        <MdGroup className="text-[16px]" />
                        User Management
                    </button>
                    <button className="pb-2 border-b-[2px] border-transparent text-slate-500 hover:text-slate-900 font-medium text-xs flex items-center gap-1.5 transition-colors">
                        <MdNotifications className="text-[16px]" />
                        Notifications
                    </button>
                    <button className="pb-2 border-b-[2px] border-transparent text-slate-500 hover:text-slate-900 font-medium text-xs flex items-center gap-1.5 transition-colors">
                        <MdExtension className="text-[16px]" />
                        Integrations
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="space-y-4 pb-8">
                {/* Card 1: Shop Information */}
                <section className="bg-surface-light rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2 bg-gray-50/50">
                        <MdStorefront className="text-primary text-[20px]" />
                        <h2 className="text-sm font-bold text-slate-900">Shop Information</h2>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Logo Upload */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-3 border-b border-slate-200 border-dashed">
                            <div
                                onClick={handleLogoClick}
                                className="size-16 rounded-lg bg-gray-100 flex items-center justify-center border border-slate-200 overflow-hidden relative group cursor-pointer"
                            >
                                {settings?.logoUrl ? (
                                    <img className="absolute inset-0 w-full h-full object-cover" alt="Shop logo preview" src={settings.logoUrl} />
                                ) : (
                                    <MdAddPhotoAlternate className="text-slate-400 text-2xl group-hover:scale-110 transition-transform" />
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-medium">Change</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xs font-bold text-slate-900">Shop Logo</h3>
                                <p className="text-[10px] text-slate-500 mt-0.5 mb-2">This logo will appear on your invoices and reports. Recommended size: 500x500px.</p>
                                <div className="flex gap-2">
                                    <button onClick={handleLogoClick} className="text-primary text-[10px] font-semibold hover:underline">Upload New</button>
                                    {settings?.logoUrl && (
                                        <button onClick={handleRemoveLogo} className="text-red-500 text-[10px] font-semibold hover:underline">Remove</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Fields */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-900">Shop Name</span>
                            <input
                                name="shopName"
                                value={formData.shopName}
                                onChange={handleInputChange}
                                className="rounded-lg border-slate-200 bg-white text-slate-900 h-9 px-3 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                                type="text"
                                placeholder="Sayan Digital"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-900">Tax ID / VAT Number</span>
                            <input
                                name="taxId"
                                value={formData.taxId}
                                onChange={handleInputChange}
                                className="rounded-lg border-slate-200 bg-white text-slate-900 h-9 px-3 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                                type="text"
                                placeholder="Tax ID"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 md:col-span-2">
                            <span className="text-xs font-semibold text-slate-900">Business Address</span>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="rounded-lg border-slate-200 bg-white text-slate-900 px-3 py-2 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 resize-none"
                                rows={2}
                                placeholder="Business Address"
                            ></textarea>
                        </label>
                    </div>
                </section>

                {/* Card 2: Contact & Regional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Contact Info */}
                    <section className="bg-surface-light rounded-xl shadow-sm border border-slate-200">
                        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2 bg-gray-50/50">
                            <MdContactMail className="text-primary text-[20px]" />
                            <h2 className="text-sm font-bold text-slate-900">Contact Details</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-slate-900">Public Email</span>
                                <div className="relative">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500">
                                        <MdMail className="text-[16px]" />
                                    </span>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-slate-200 bg-white text-slate-900 h-9 pl-8 pr-3 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        type="email"
                                        placeholder="hello@sayandigital.com"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-slate-900">Phone Number</span>
                                <div className="relative">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500">
                                        <MdCall className="text-[16px]" />
                                    </span>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-slate-200 bg-white text-slate-900 h-9 pl-8 pr-3 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        type="tel"
                                        placeholder="+91 00000 00000"
                                    />
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* Regional Settings */}
                    <section className="bg-surface-light rounded-xl shadow-sm border border-slate-200">
                        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2 bg-gray-50/50">
                            <MdPublic className="text-primary text-[20px]" />
                            <h2 className="text-sm font-bold text-slate-900">Regional Settings</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-slate-900">Currency</span>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleInputChange}
                                    className="rounded-lg border-slate-200 bg-white text-slate-900 h-9 px-3 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                >
                                    <option value="INR">INR (₹) - Indian Rupee</option>
                                    <option value="USD">USD ($) - US Dollar</option>
                                    <option value="EUR">EUR (€) - Euro</option>
                                    <option value="GBP">GBP (£) - British Pound</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-slate-900">Timezone</span>
                                <select
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleInputChange}
                                    className="rounded-lg border-slate-200 bg-white text-slate-900 h-9 px-3 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                >
                                    <option value="Asia/Kolkata">(GMT+05:30) India Standard Time</option>
                                    <option value="UTC-5">(GMT-05:00) Eastern Time (US & Canada)</option>
                                    <option value="UTC-8">(GMT-08:00) Pacific Time (US & Canada)</option>
                                    <option value="UTC+1">(GMT+01:00) Central European Time</option>
                                </select>
                            </label>
                        </div>
                    </section>
                </div>

                {/* Card 3: Notifications Preview */}
                <section className="bg-surface-light rounded-xl shadow-sm border border-slate-200">
                    <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2 bg-gray-50/50">
                        <MdNotificationsActive className="text-primary text-[20px]" />
                        <h2 className="text-sm font-bold text-slate-900">Quick Notification Preferences</h2>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-900">Low Stock Alerts</h3>
                                    <p className="text-[10px] text-slate-500">Receive email when inventory drops below threshold.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox" />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="border-t border-slate-200 my-0.5"></div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-900">New Order Notifications</h3>
                                    <p className="text-[10px] text-slate-500">Get notified immediately when a new order is placed.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input className="sr-only peer" type="checkbox" />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
