import React from 'react';
import Link from 'next/link';
import type { Section } from '@/lib/supabase/types';

const parentLabels: Record<string, { label: string; emoji: string; cls: string }> = {
    boy: {
        label: 'أولاد',
        emoji: '👦',
        cls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
    },
    girl: {
        label: 'بنات',
        emoji: '👧',
        cls: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    },
    offers: {
        label: 'عروض',
        emoji: '🏷️',
        cls: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    },
};

interface Props {
    section: Section;
}

export default function SectionCard({ section }: Props) {
    const parent = section.parent ? parentLabels[section.parent] : null;

    return (
        <Link
            href={`/products?section=${section.id}`}
            className="group relative flex flex-col items-center justify-end overflow-hidden rounded-2xl aspect-square bg-slate-200 dark:bg-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            {/* Background Image */}
            {section.image_url ? (
                <img
                    src={section.image_url}
                    alt={section.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-blue-600 dark:to-indigo-900" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-4 w-full text-center">
                {/* Parent badge */}
                {parent && (
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${parent.cls}`}>
                        {parent.emoji} {parent.label}
                    </span>
                )}
                <h3 className="text-white font-black text-lg drop-shadow-md">{section.name}</h3>
                <p className="text-white/70 text-xs mt-1 group-hover:text-white transition-colors">
                    تصفّح الآن →
                </p>
            </div>
        </Link>
    );
}
