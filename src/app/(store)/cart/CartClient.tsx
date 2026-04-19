"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { removeFromCart, updateCartItemQuantity } from "@/app/actions/cart";
import { toast } from "sonner";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

type CartClientItem = {
    id: number;
    quantity: number;
    size: string;
    color: string;
    product: {
        id: number;
        name: string;
        price: number;
        images: string[] | null;
    };
};

export default function CartClient({ initialItems }: { initialItems: CartClientItem[] }) {
    const [items, setItems] = useState<CartClientItem[]>(initialItems);
    const [isPending, startTransition] = useTransition();

    const removeLocalItem = useCartStore((state) => state.removeItem);
    const updateLocalQuantity = useCartStore((state) => state.updateQuantity);

    const handleUpdateQuantity = async (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        const itemToUpdate = items.find(i => i.id === id);
        if (!itemToUpdate) return;

        // Optimistic update
        setItems((current) =>
            current.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );

        updateLocalQuantity(itemToUpdate.product.id, itemToUpdate.size, itemToUpdate.color, newQuantity);

        startTransition(async () => {
            try {
                await updateCartItemQuantity(id, newQuantity);
            } catch (error) {
                toast.error("فشل في تحديث الكمية");
            }
        });
    };

    const handleRemove = async (id: number) => {
        const itemToRemove = items.find(i => i.id === id);
        if (!itemToRemove) return;

        // Optimistic update
        setItems((current) => current.filter((item) => item.id !== id));

        removeLocalItem(itemToRemove.product.id, itemToRemove.size, itemToRemove.color);

        startTransition(async () => {
            try {
                await removeFromCart(id);
                toast.success("تم إزالة المنتج من السلة");
            } catch (error) {
                toast.error("فشل في إزالة المنتج");
            }
        });
    };

    const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const total = subtotal;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
                <div className="text-8xl">🛍️</div>
                <h2 className="text-2xl font-black text-slate-700 dark:text-slate-300">السلة فارغة</h2>
                <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    تصفح المنتجات
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        {/* Image */}
                        <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                            {item.product.images?.[0] ? (
                                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl">🛍️</div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col flex-1 gap-2">
                            <div className="flex justify-between items-start">
                                <Link href={`/product/${item.product.id}`} className="font-bold text-lg text-slate-800 dark:text-white hover:text-blue-600 transition-colors">
                                    {item.product.name}
                                </Link>
                                <div className="font-black text-blue-600 dark:text-blue-400 whitespace-nowrap mr-4">
                                    {item.product.price.toLocaleString("ar-EG")} <span className="text-sm">ج.م</span>
                                </div>
                            </div>

                            <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                                {item.size && <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">المقاس: {item.size}</span>}
                                {item.color && <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">اللون: {item.color}</span>}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                    <span className="font-bold w-6 text-center text-slate-800 dark:text-white">{item.quantity}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300 disabled:opacity-50 cursor-pointer"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                                    title="إزالة المنتج"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-fit sticky top-24">
                <h3 className="font-black text-xl text-slate-800 dark:text-white">ملخص الطلب</h3>
                <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-300 font-semibold">
                    <div className="flex justify-between">
                        <span>المجموع الفرعي ({items.length} منتجات)</span>
                        <span>{subtotal.toLocaleString("ar-EG")} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                        <span>التوصيل</span>
                        <span className="text-emerald-500">يتم حسابه لاحقاً</span>
                    </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-700" />

                <div className="flex justify-between font-black text-xl text-slate-800 dark:text-white">
                    <span>الإجمالي</span>
                    <span className="text-blue-600 dark:text-blue-400">{total.toLocaleString("ar-EG")} ج.م</span>
                </div>

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-200 mt-2">
                    إتمام الطلب
                </button>
            </div>
        </div>
    );
}
