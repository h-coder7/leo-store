import React from 'react';
import { getSections } from '@/app/actions/products';
import Link from 'next/link';
import type { Section } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

const parentLabels: Record<string, string> = {
    boy: '👦 أولاد',
    girl: '👧 بنات',
    offers: '🏷️ عروض',
};

export default async function SectionsAdminPage() {
    const sections = await getSections();

    return (
        <div className="p-8 max-w-7xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">إدارة الأقسام</h1>
                    <p className="text-slate-500 mt-1">
                        {sections.length > 0 ? `${sections.length} قسم مسجّل` : 'لا توجد أقسام بعد'}
                    </p>
                </div>
                <Link
                    href="/admin/add-section"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    <span className="text-xl leading-none">+</span>
                    إضافة قسم جديد
                </Link>
            </div>

            {/* Grid */}
            {sections.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {sections.map((section: Section) => (
                        <div
                            key={section.id}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-100 dark:border-slate-700 overflow-hidden group"
                        >
                            {/* Image */}
                            <div className="w-full aspect-video bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                {section.image_url ? (
                                    <img
                                        src={section.image_url}
                                        alt={section.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl">📂</div>
                                )}
                            </div>
                            {/* Info */}
                            <div className="p-4">
                                <div className="font-bold text-slate-900 dark:text-white">{section.name}</div>
                                {section.parent && (
                                    <span className="mt-1 inline-block text-xs text-slate-500 dark:text-slate-400">
                                        {parentLabels[section.parent] ?? section.parent}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600 text-center">
                    <span className="text-6xl mb-4">📂</span>
                    <p className="text-lg font-bold">لا توجد أقسام حالياً</p>
                    <p className="text-sm mt-1">أضف قسمك الأول لتنظيم المنتجات!</p>
                </div>
            )}
        </div>
    );
}
