import React from 'react';

export default function StorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            مرحباً بكم في <span className="text-blue-600">متجر ليو</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            اكتشف مجموعتنا المميزة من المنتجات المصممة بعناية فائقة لتلبية تطلعاتك.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative bg-white dark:bg-slate-800 rounded-3xl p-1 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="aspect-square bg-slate-100 dark:bg-slate-700/50 rounded-2xl overflow-hidden mb-6">
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  صورة المنتج
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">منتج فاخر {i}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">هذا الوصف يعبر عن جودة المنتج ومميزاته الفريدة التي تجعله خيارك الأمثل.</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">99.99 $</span>
                  <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
                    أضف إلى السلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
