"use client";

import React from 'react';
import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, ArrowRight, FolderOpen, Image as ImageIcon } from 'lucide-react';

export default function AdminNavbar() {
    return (
        <nav className="w-full bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="font-bold">A</span>
                            </div>
                            <span className="font-black text-lg tracking-tight">لوحة <span className="text-blue-500">التحكم</span></span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {[
                                { name: 'الرئيسية', icon: LayoutDashboard, href: '/admin' },
                                { name: 'البنرات', icon: ImageIcon, href: '/admin/banners' },
                                { name: 'الأقسام', icon: FolderOpen, href: '/admin/sections' },
                                { name: 'المنتجات', icon: Package, href: '/admin/products' },
                                { name: 'الطلبات', icon: ShoppingBag, href: '/admin/orders' },
                                { name: 'الإعدادات', icon: Settings, href: '/admin/settings' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <ArrowRight className="w-4 h-4" />
                            العودة للمتجر
                        </Link>
                        <div className="h-8 w-[1px] bg-slate-800 mx-2" />
                        <form action={logout}>
                            <button
                                type="submit"
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                                title="تسجيل الخروج"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}
