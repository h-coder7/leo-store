"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote, MessageCircleHeart } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Testimonial } from '@/lib/supabase/types';

interface TestimonialsSliderProps {
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="mt-20 mb-8" dir="rtl">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10">
                <div
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #FCD201, #FFA000)', color: '#1a1a1a' }}
                >
                    <MessageCircleHeart className="w-4 h-4" />
                    <span>آراء عملائنا</span>
                </div>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #FCD201, transparent)' }} />
                <p className="text-sm font-semibold" style={{ color: '#b8860b' }}>ثقتكم تلهمنا</p>
            </div>

            {/* Sub-heading */}
            <p className="text-center text-slate-500 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
                نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة تسوق ممكنة.
            </p>

            <div className="relative">
                <Swiper
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640:  { slidesPerView: 1 },
                        768:  { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="pb-14 testimonials-swiper"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className="p-6 h-full flex flex-col relative group hover:-translate-y-1 transition-all duration-400"
                                style={{
                                    background: '#ffffff',
                                    borderRadius: '2rem',
                                    border: '2px solid rgba(252,210,1,0.18)',
                                    boxShadow: '0 4px 24px rgba(252,210,1,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                                }}
                            >
                                {/* Corner accent */}
                                <div
                                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-[3rem] rounded-tr-[2rem] opacity-60"
                                    style={{
                                        background: index % 3 === 0
                                            ? 'linear-gradient(135deg, rgba(252,210,1,0.15), rgba(255,160,0,0.08))'
                                            : index % 3 === 1
                                            ? 'linear-gradient(135deg, rgba(96,165,250,0.12), rgba(59,130,246,0.06))'
                                            : 'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(236,72,153,0.06))',
                                    }}
                                />

                                {/* Big quote icon */}
                                <div className="absolute top-5 left-5 opacity-10 group-hover:opacity-20 transition-opacity duration-400">
                                    <Quote size={52} style={{ color: '#FCD201' }} />
                                </div>

                                {/* Avatar + Name */}
                                <div className="flex items-center gap-3 mb-5 relative z-10">
                                    <div
                                        className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                                        style={{
                                            border: '2.5px solid #FCD201',
                                            boxShadow: '0 0 0 3px rgba(252,210,1,0.2)',
                                        }}
                                    >
                                        {item.avatar_url ? (
                                            <img
                                                src={item.avatar_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center font-black text-base"
                                                style={{ background: 'linear-gradient(135deg,#FCD201,#FFA000)', color: '#1a1a1a' }}
                                            >
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 text-sm leading-tight">{item.name}</h4>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{item.role || 'عميل'}</p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-4 relative z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200 fill-slate-200'}
                                        />
                                    ))}
                                </div>

                                {/* Review text */}
                                <p className="text-slate-600 text-sm leading-relaxed relative z-10 flex-grow italic">
                                    &ldquo;{item.content}&rdquo;
                                </p>

                                {/* Bottom accent bar */}
                                <div
                                    className="mt-5 h-1 w-8 rounded-full group-hover:w-16 transition-all duration-500"
                                    style={{ background: 'linear-gradient(to right, #FCD201, #FFA000)' }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .testimonials-swiper .swiper-button-next,
                .testimonials-swiper .swiper-button-prev {
                    color: #1a1a1a !important;
                    background: linear-gradient(135deg, #FCD201, #FFA000) !important;
                    width: 44px !important;
                    height: 44px !important;
                    border-radius: 50% !important;
                    box-shadow: 0 4px 18px rgba(252,210,1,0.45) !important;
                    transition: transform 0.3s !important;
                }
                .testimonials-swiper .swiper-button-next:hover,
                .testimonials-swiper .swiper-button-prev:hover {
                    transform: scale(1.1) !important;
                }
                .testimonials-swiper .swiper-button-next:after,
                .testimonials-swiper .swiper-button-prev:after {
                    font-size: 16px !important;
                    font-weight: 900 !important;
                }
                .testimonials-swiper .swiper-pagination-bullet {
                    background: rgba(252,210,1,0.3) !important;
                    opacity: 1 !important;
                }
                .testimonials-swiper .swiper-pagination-bullet-active {
                    background: #FCD201 !important;
                    transform: scale(1.3) !important;
                }
            `}</style>
        </section>
    );
}
