"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Testimonial } from '@/lib/supabase/types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface TestimonialsSliderProps {
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="mt-20 mb-16 px-4" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">آراء عملائنا</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة تسوق ممكنة.</p>
                </div>

                <div className="relative">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="pb-16"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col relative group hover:scale-[1.02] transition-transform duration-300">
                                    <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                                        <Quote size={60} />
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                        <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-primary/20 overflow-hidden flex items-center justify-center">
                                            {item.avatar_url ? (
                                                <img 
                                                    src={item.avatar_url} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Star className="text-primary/20 fill-primary/20 w-8 h-8" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                                            <p className="text-xs text-slate-500">{item.role || 'عميل'}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4 relative z-10">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={16} 
                                                className={i < item.rating ? "fill-primary text-primary" : "text-slate-300 dark:text-slate-600"} 
                                            />
                                        ))}
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic relative z-10 flex-grow">
                                        "{item.content}"
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .swiper-button-next, .swiper-button-prev {
                    color: #FCD201 !important;
                    background: white !important;
                    width: 45px !important;
                    height: 45px !important;
                    border-radius: 50% !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 18px !important;
                    font-weight: bold !important;
                }
                .swiper-pagination-bullet-active {
                    background: #FCD201 !important;
                }
            `}</style>
        </section>
    );
}
