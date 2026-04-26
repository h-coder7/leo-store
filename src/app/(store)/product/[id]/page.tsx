import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/supabase/types';
import Link from 'next/link';
import ProductActions from './ProductActions';
import { ShoppingBag, Sparkles, Sun, Snowflake } from 'lucide-react';

interface Props {
    params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', parseInt(id, 10))
        .single();

    if (error || !data) return null;
    return data as Product;
}

const seasonBadge: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    صيف: { label: 'صيفي', cls: 'bg-amber-100 text-amber-700', icon: <Sun className="w-3.5 h-3.5" /> },
    شتاء: { label: 'شتوي', cls: 'bg-[#FCD201]/10 text-[#997500]', icon: <Snowflake className="w-3.5 h-3.5" /> },
    'كل الموسم': { label: 'كل الموسم', cls: 'bg-emerald-100 text-emerald-700', icon: <Sparkles className="w-3.5 h-3.5" /> },
};

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) notFound();

    const badge = product.season ? seasonBadge[product.season] : null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900" dir="rtl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#997500] dark:hover:text-[#FCD201] text-sm mb-8 transition-colors"
                >
                    ← العودة للمتجر
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Images */}
                    <div className="flex flex-col gap-3">
                        {/* Main image */}
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-md">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                    <ShoppingBag className="w-20 h-20" />
                                </div>
                            )}
                        </div>
                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {product.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700"
                                    >
                                        <img src={img} alt={`صورة ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-5">
                        {/* Season & name */}
                        {badge && (
                            <span className={`self-start text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm ${badge.cls}`}>
                                {badge.icon}
                                {badge.label}
                            </span>
                        )}
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="text-4xl font-black text-[#997500] dark:text-[#FCD201]">
                            {product.price.toLocaleString('ar-EG')} <span className="text-xl font-bold">ج.م</span>
                        </div>

                        <hr className="border-slate-200 dark:border-slate-700" />

                        <ProductActions product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
