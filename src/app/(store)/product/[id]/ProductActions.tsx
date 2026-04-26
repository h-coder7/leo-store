"use client";

import React, { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import type { Product } from "@/lib/supabase/types";
import { addToCart } from "@/app/actions/cart";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";

export default function ProductActions({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
    const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "");
    const [isPending, setIsPending] = useState(false);

    // This updates local UI immediately (Navbar count)
    const addLocalItem = useCartStore(state => state.addItem);

    const handleAddToCart = async () => {
        if (product.sizes?.length && !selectedSize) {
            toast.error("يرجى اختيار المقاس");
            return;
        }

        if (product.colors?.length && !selectedColor) {
            toast.error("يرجى اختيار اللون");
            return;
        }

        try {
            setIsPending(true);

            // Add to local Zustand for immediate UI update
            addLocalItem({
                product_id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                size: selectedSize,
                color: selectedColor,
                image: product.images?.[0] || ""
            });

            // Persist to Supabase
            await addToCart(product.id, 1, selectedSize, selectedColor);

            toast.success("تم إضافة المنتج للسلة بنجاح!");
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء الإضافة للسلة");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
                <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        المقاسات المتاحة
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s) => (
                            <span
                                key={s}
                                onClick={() => setSelectedSize(s)}
                                className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-colors cursor-pointer
                  ${selectedSize === s
                                        ? "border-primary text-primary dark:border-primary dark:text-primary"
                                        : "border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary"}
                `}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
                <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        الألوان المتاحة
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {product.colors.map((c) => (
                            <span
                                key={c}
                                onClick={() => setSelectedColor(c)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer border-2
                  ${selectedColor === c
                                        ? "border-primary text-primary bg-primary/10 dark:border-primary dark:text-primary dark:bg-primary/20"
                                        : "border-transparent bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/50"}
                `}
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Add to cart button */}
            <button
                onClick={handleAddToCart}
                disabled={isPending}
                className="mt-4 w-full py-4 bg-[#FCD201] hover:bg-[#ebd201] disabled:opacity-50 active:scale-95 text-[#1a1a1a] font-black text-lg rounded-2xl shadow-lg shadow-[#FCD201]/30 transition-all duration-200 flex items-center justify-center gap-3"
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>جاري الإضافة...</span>
                    </>
                ) : (
                    <>
                        <ShoppingCart className="w-6 h-6" />
                        <span>أضف إلى السلة</span>
                    </>
                )}
            </button>
        </div>
    );
}
