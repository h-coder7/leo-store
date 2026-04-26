import React from 'react';
import Link from 'next/link';
import { addBanner } from '@/app/actions/banners';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function AddBannerPage() {

    return (
        <div className="p-8 max-w-4xl mx-auto" dir="rtl">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">إضافة بنر جديد</h1>
                    <p className="text-slate-500 mt-1 text-sm">قم بتعبئة بيانات العرض ليظهر في واجهة المتجر</p>
                </div>
                <Link
                    href="/admin/banners"
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    رجوع
                </Link>
            </div>

            <form action={addBanner} className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">عنوان البنر</label>
                            <input
                                name="title"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500 transition-all font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">الرابط (Route)</label>
                            <input
                                name="link_url"
                                type="text"
                                defaultValue="/products"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">الوصف</label>
                        <textarea
                            name="description"
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500 transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-2 mb-6">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">نص الزر</label>
                        <input
                            name="button_text"
                            type="text"
                            defaultValue="تسوق الآن"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500 transition-all font-bold"
                        />
                    </div>
                    {/* Hidden color field — kept for DB compatibility but not shown */}
                    <input type="hidden" name="color" value="" />

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">الصورة الخلفية</label>
                        <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center hover:bg-slate-50 transition-all cursor-pointer">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                            <p className="text-sm text-slate-500">اسحب الصورة أو اضغط هنا للاختيار</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        حفظ ونشر البنر
                    </button>
                </div>
            </form>
        </div>
    );
}
