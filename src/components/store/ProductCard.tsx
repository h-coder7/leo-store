import React from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/supabase/types';

const seasonBadge: Record<string, { label: string; cls: string }> = {
  صيف: { label: '☀️ صيفي', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  شتاء: { label: '❄️ شتوي', cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'كل الموسم': {
    label: '🌀 كل الموسم',
    cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const mainImage = product.images?.[0] ?? null;
  const badge = product.season ? seasonBadge[product.season] : null;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-700">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl select-none">
            🛍️
          </div>
        )}
        {/* Season badge overlay */}
        {badge && (
          <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow ${badge.cls}`}>
            {badge.label}
          </span>
        )}
        {/* Multi-image count */}
        {product.images && product.images.length > 1 && (
          <span className="absolute bottom-3 left-3 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
            +{product.images.length - 1} صور
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Name */}
        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 text-sm leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400"
              >
                {s}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs text-slate-400">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400">الألوان:</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {product.colors.slice(0, 3).join('، ')}
              {product.colors.length > 3 && ` +${product.colors.length - 3}`}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
          <span className="text-lg font-black text-blue-600 dark:text-blue-400">
            {product.price.toLocaleString('ar-EG')} ج.م
          </span>
        </div>
      </div>
    </Link>
  );
}
