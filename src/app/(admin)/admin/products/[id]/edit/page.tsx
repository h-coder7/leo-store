import React from 'react';
import { getProduct, getSections, updateProduct } from '@/app/actions/products';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const COLORS = [
    { label: 'أبيض', value: 'أبيض', hex: '#ffffff' },
    { label: 'أسود', value: 'أسود', hex: '#111111' },
    { label: 'أحمر', value: 'أحمر', hex: '#ef4444' },
    { label: 'أزرق', value: 'أزرق', hex: '#3b82f6' },
    { label: 'أخضر', value: 'أخضر', hex: '#22c55e' },
    { label: 'أصفر', value: 'أصفر', hex: '#eab308' },
    { label: 'رمادي', value: 'رمادي', hex: '#6b7280' },
    { label: 'وردي', value: 'وردي', hex: '#ec4899' },
    { label: 'بني', value: 'بني', hex: '#92400e' },
    { label: 'بيج', value: 'بيج', hex: '#d4b896' },
    { label: 'برتقالي', value: 'برتقالي', hex: '#f97316' },
    { label: 'بنفسجي', value: 'بنفسجي', hex: '#8b5cf6' },
];

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) notFound();

    const [product, sections] = await Promise.all([
        getProduct(productId),
        getSections()
    ]);

    if (!product) notFound();

    const updateProductWithId = updateProduct.bind(null, product.id);

    return (
        <div className="p-8 max-w-4xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">تعديل المنتج</h1>
                    <p className="text-slate-500 mt-1">تعديل بيانات {product.name}</p>
                </div>
                <Link
                    href="/admin/products"
                    className="text-slate-500 hover:text-slate-800 dark:hover:white text-sm flex items-center gap-1 transition-colors"
                >
                    ← العودة للمنتجات
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
                <form action={updateProductWithId} className="space-y-8">
                    {/* Name + Price + Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                اسم المنتج <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={product.name}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                السعر (ج.م) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                step="0.01"
                                min="0"
                                defaultValue={product.price}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="section_id" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                القسم
                            </label>
                            <select
                                id="section_id"
                                name="section_id"
                                defaultValue={product.section_id || ''}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            >
                                <option value="">— بدون قسم —</option>
                                {sections.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Season */}
                    <div>
                        <p className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">الموسم</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { val: '', label: 'غير محدد' },
                                { val: 'صيف', label: '☀️ صيف' },
                                { val: 'شتاء', label: '❄️ شتاء' },
                                { val: 'كل الموسم', label: '🌀 كل الموسم' },
                            ].map(({ val, label }) => (
                                <label key={val} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="season"
                                        value={val}
                                        defaultChecked={product.season === val || (!product.season && val === '')}
                                        className="accent-primary"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <p className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">المقاسات المتاحة</p>
                        <div className="flex flex-wrap gap-3">
                            {SIZES.map((size) => (
                                <label key={size} className="cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="sizes"
                                        value={size}
                                        defaultChecked={product.sizes?.includes(size)}
                                        className="sr-only peer"
                                    />
                                    <span className="px-4 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all select-none">
                                        {size}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <p className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">الألوان المتاحة</p>
                        <div className="flex flex-wrap gap-3">
                            {COLORS.map(({ label, value, hex }) => (
                                <label key={value} className="cursor-pointer flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="colors"
                                        value={value}
                                        defaultChecked={product.colors?.includes(value)}
                                        className="sr-only peer"
                                    />
                                    <span className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all select-none">
                                        <span
                                            className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shrink-0"
                                            style={{ backgroundColor: hex }}
                                        />
                                        {label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                            صور المنتج الحالية
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {product.images?.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    {/* In a real app, we'd add a "remove" button for existing images here */}
                                </div>
                            ))}
                        </div>
                        <input type="hidden" name="existing_images" value={JSON.stringify(product.images || [])} />

                        <label htmlFor="images" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            إضافة صور جديدة
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/*"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                        />
                    </div>

                    {/* Submit */}
                    <div className="pt-4 flex justify-end gap-4">
                        <Link
                            href="/admin/products"
                            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            إلغاء
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            ✓ حفظ التعديلات
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
