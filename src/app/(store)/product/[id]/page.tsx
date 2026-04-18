import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/supabase/types';
import Link from 'next/link';

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

const seasonBadge: Record<string, { label: string; cls: string }> = {
  صيف: { label: '☀️ صيفي', cls: 'bg-amber-100 text-amber-700' },
  شتاء: { label: '❄️ شتوي', cls: 'bg-blue-100 text-blue-700' },
  'كل الموسم': { label: '🌀 كل الموسم', cls: 'bg-emerald-100 text-emerald-700' },
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
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm mb-8 transition-colors"
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
                <div className="w-full h-full flex items-center justify-center text-6xl">🛍️</div>
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
              <span className={`self-start text-xs font-bold px-3 py-1 rounded-full ${badge.cls}`}>
                {badge.label}
              </span>
            )}
            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400">
              {product.price.toLocaleString('ar-EG')} <span className="text-xl font-bold">ج.م</span>
            </div>

            <hr className="border-slate-200 dark:border-slate-700" />

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  المقاسات المتاحة
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  الألوان المتاحة
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart button */}
            <button className="mt-4 w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all duration-200">
              🛒 أضف إلى السلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
