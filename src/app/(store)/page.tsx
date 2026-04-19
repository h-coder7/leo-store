import React from 'react';
import BannerSlider from '@/components/store/BannerSlider';
import SectionCard from '@/components/store/SectionCard';
import ProductCard from '@/components/store/ProductCard';
import { getProducts, getSections } from '@/app/actions/products';
import { getBanners } from '@/app/actions/banners';

export const dynamic = 'force-dynamic';

export default async function StorePage() {
    const [products, sections, banners] = await Promise.all([
        getProducts(), 
        getSections(),
        getBanners()
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Banner */}
            <BannerSlider banners={banners} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" dir="rtl">

                {/* ── Sections ── */}
                <section className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">الأقسام</h2>
                            <p className="text-slate-500 text-sm mt-0.5">تصفّح حسب القسم</p>
                        </div>
                    </div>
                    {sections.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {sections.map((section) => (
                                <SectionCard key={section.id} section={section} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <span className="text-4xl mb-2">📁</span>
                            <p className="text-md font-bold">لا توجد أقسام حالياً</p>
                        </div>
                    )}
                </section>

                {/* ── Products ── */}
                <section className="mt-14">
                    <div className="flex justify-between mb-10">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">أحدث المنتجات</h2>
                        <p className="text-slate-500 text-sm mt-0.5">
                            {products.length > 0 ? `${products.length} منتج متاح` : 'لم يُضف منتجات بعد'}
                        </p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600">
                            <span className="text-6xl mb-4">🛍️</span>
                            <p className="text-lg font-bold">لا توجد منتجات حالياً</p>
                            <p className="text-sm mt-1">تابعنا قريباً لمزيد من المنتجات!</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
