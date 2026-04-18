import React from 'react';
import { addSection } from '@/app/actions/products';
import Link from 'next/link';

export default function AddSectionPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">إضافة قسم جديد</h1>
          <p className="text-slate-500 mt-1">أدخل بيانات القسم لإضافته إلى المتجر</p>
        </div>
        <Link
          href="/admin/sections"
          className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          ← العودة للأقسام
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
        <form action={addSection} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              اسم القسم <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="مثال: قمصان — بناطيل — فساتين"
            />
          </div>

          {/* Parent */}
          <div>
            <p className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">التصنيف</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { val: '', label: 'عام', emoji: '🌐' },
                { val: 'boy', label: 'أولاد', emoji: '👦' },
                { val: 'girl', label: 'بنات', emoji: '👧' },
                { val: 'offers', label: 'عروض', emoji: '🏷️' },
              ].map(({ val, label, emoji }) => (
                <label key={val} className="cursor-pointer">
                  <input type="radio" name="parent" value={val} defaultChecked={val === ''} className="sr-only peer" />
                  <span className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/30 transition-all select-none text-center">
                    <span className="text-2xl">{emoji}</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 peer-checked:text-indigo-700">{label}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image_url" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              رابط صورة القسم (اختياري)
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="https://example.com/section-image.jpg"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-4">
            <Link
              href="/admin/sections"
              className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              إلغاء
            </Link>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg"
            >
              ✓ حفظ القسم
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
