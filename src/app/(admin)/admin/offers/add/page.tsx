import React from 'react';
import Link from 'next/link';
import { addOffer } from '@/app/actions/offers';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function AddOfferPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto" dir="rtl">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">إضافة عرض جديد</h1>
                    <p className="text-slate-500 mt-1 text-sm">قم بتعبئة بيانات العرض ليظهر في واجهة المتجر</p>
                </div>
                <Link
                    href="/admin/offers"
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    رجوع
                </Link>
            </div>

            <form action={addOffer} className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">عنوان العرض</label>
                            <input
                                name="title"
                                type="text"
                                placeholder="مثال: عروض الشتوى"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">علامة الخصم (Label)</label>
                            <input
                                name="discount_label"
                                type="text"
                                placeholder="مثال: خصم 10%"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">نص العرض البسيط</label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="مثال: الحق العروض على الملابس الشتوى قبل انتهاء الموسم"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 px-1">صورة العرض</label>
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
                        className="bg-primary hover:opacity-90 text-primary-foreground px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        حفظ ونشر العرض
                    </button>
                </div>
            </form>
        </div>
    );
}
