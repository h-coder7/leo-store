import React from 'react';
import { getProducts, getSections } from '@/app/actions/products';
import Link from 'next/link';
import type { Product, Section } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

const seasonColors: Record<string, string> = {
    صيف: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    شتاء: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'كل الموسم': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export default async function ProductsAdminPage() {
    const [products, sections] = await Promise.all([getProducts(), getSections()]);

    const sectionMap = Object.fromEntries(sections.map((s: Section) => [s.id, s.name]));

    return (
        <div className="p-8 max-w-7xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">إدارة المنتجات</h1>
                    <p className="text-slate-500 mt-1">
                        {products.length > 0 ? `${products.length} منتج مسجّل` : 'لا توجد منتجات بعد'}
                    </p>
                </div>
                <Link
                    href="/admin/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    <span className="text-xl leading-none">+</span>
                    إضافة منتج جديد
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">المنتج</th>
                                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">القسم</th>
                                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">السعر</th>
                                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">الموسم</th>
                                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">المقاسات</th>
                                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">تاريخ الإضافة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product: Product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/25 transition-colors"
                                    >
                                        {/* Product name + image */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3 min-w-[220px]">
                                                {product.images && product.images.length > 0 ? (
                                                    <div
                                                        className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700"
                                                        style={{ backgroundImage: `url(${product.images[0]})` }}
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center text-xl">
                                                        🛍️
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                                        {product.name}
                                                    </div>
                                                    {/* Color dots */}
                                                    {product.colors && product.colors.length > 0 && (
                                                        <div className="flex gap-1 mt-1">
                                                            {product.colors.slice(0, 5).map((c) => (
                                                                <span key={c} className="text-xs text-slate-400">
                                                                    {c}
                                                                </span>
                                                            ))}
                                                            {product.colors.length > 5 && (
                                                                <span className="text-xs text-slate-400">+{product.colors.length - 5}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Section */}
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                            {product.section_id && sectionMap[product.section_id]
                                                ? sectionMap[product.section_id]
                                                : <span className="text-slate-400">—</span>}
                                        </td>

                                        {/* Price */}
                                        <td className="p-4 text-emerald-600 dark:text-emerald-400 font-black whitespace-nowrap">
                                            {product.price} ج.م
                                        </td>

                                        {/* Season */}
                                        <td className="p-4">
                                            {product.season ? (
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${seasonColors[product.season] ?? 'bg-slate-100 text-slate-600'
                                                        }`}
                                                >
                                                    {product.season}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-sm">—</span>
                                            )}
                                        </td>

                                        {/* Sizes */}
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {product.sizes && product.sizes.length > 0 ? (
                                                    product.sizes.map((s) => (
                                                        <span
                                                            key={s}
                                                            className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                                                        >
                                                            {s}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-400 text-sm">—</span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="p-4 text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                                            {new Date(product.created_at).toLocaleDateString('ar-EG', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-16 text-center text-slate-500 dark:text-slate-400">
                                        <div className="text-5xl mb-4">🛍️</div>
                                        <div className="font-bold text-lg mb-2">لا توجد منتجات حالياً</div>
                                        <div className="text-sm">ابدأ بإضافة منتجك الأول!</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
