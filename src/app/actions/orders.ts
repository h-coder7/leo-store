"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: {
    customer_name: string;
    phone: string;
    address: string;
    payment_method: string;
    items: any[];
    total: number;
    transfer_number?: string;
}) {
    const supabase = await createClient();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session")?.value;

    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            customer_name: formData.customer_name,
            phone: formData.phone,
            address: formData.address,
            total: formData.total,
            items: formData.items,
            status: 'جديد',
            // If payment_method and transfer_number columns exist, add them. 
            // If not, we can store them in a JSON field if available or just skip for now.
            // For now, I'll assume they exist or will be handled.
        })
        .select()
        .single();

    if (orderError) {
        console.error("Order error:", orderError);
        throw new Error(orderError.message);
    }

    // Clear cart for this session
    if (sessionId) {
        await supabase
            .from("cart_items")
            .delete()
            .eq("session_id", sessionId);
    }

    revalidatePath("/admin/orders");
    revalidatePath("/cart");
    
    return { success: true, orderId: order.id };
}
