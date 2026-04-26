"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: {
    customer_name: string;
    phone: string;
    address: string;
    governorate: string;
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
            governorate: formData.governorate,
            total: formData.total,
            items: formData.items,
            status: 'جديد',
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

export async function getAllOrders() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Fetch orders error:", error);
        return [];
    }

    return data;
}

export async function updateOrderStatus(orderId: number, status: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/orders");
    return { success: true };
}

export async function deleteOrder(orderId: number) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/orders");
    return { success: true };
}
