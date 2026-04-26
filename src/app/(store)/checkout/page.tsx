import React from 'react';
import { getCartItems } from '@/app/actions/cart';
import CheckoutClient from './CheckoutClient';
import { redirect } from 'next/navigation';

export default async function CheckoutPage() {
    const items = await getCartItems();

    if (items.length === 0) {
        redirect('/cart');
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">إتمام الطلب</h1>
                    <p className="text-slate-500 font-bold">يرجى تعبئة البيانات لتأكيد طلبك</p>
                </div>
                
                <CheckoutClient initialItems={items} />
            </div>
        </div>
    );
}
