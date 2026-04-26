import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8" id="footer" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand & About */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-primary-foreground font-black text-xl">L</span>
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                ليو <span className="text-primary">ستور</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                            وجهتك الأولى للتسوق الإلكتروني. نقدم لك أحدث صيحات الموضة وأفضل المنتجات بأعلى جودة وأسعار تنافسية لتجربة تسوق لا تُنسى.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 relative inline-block">
                            روابط هامة
                            <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-primary rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'الرئيسية', href: '/' },
                                { name: 'تصفح المنتجات', href: '/products' },
                                { name: 'الأقسام', href: '/categories' },
                                { name: 'أحدث العروض', href: '/offers' },
                                { name: 'عربة التسوق', href: '/cart' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 relative inline-block">
                            تواصل معنا
                            <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-primary rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm">القاهرة، مدينة نصر، شارع عباس العقاد، تقاطع 12</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm" dir="ltr">+20 123 456 7890</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm">support@leostore.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media & Newsletter */}
                    <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 relative inline-block">
                            تابعنا
                            <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-primary rounded-full"></span>
                        </h3>
                        <div className="flex gap-4 mb-8">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        جميع الحقوق محفوظة &copy; {new Date().getFullYear()} ليو ستور.
                    </p>
                    <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
