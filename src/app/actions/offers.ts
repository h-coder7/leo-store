"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getOffers() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching offers:', error);
        return [];
    }
    return data || [];
}

export async function getAllOffers() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all offers:', error);
        return [];
    }
    return data || [];
}

export async function addOffer(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const discount_label = formData.get('discount_label') as string;
    
    // Image handling
    const imageFile = formData.get('image') as File;
    let image_url = '';

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `offers/${Date.now()}.${fileExt}`;

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(fileName, buffer, {
                contentType: imageFile.type,
                upsert: false
            });

        if (uploadError) {
            console.error('Error uploading offer image:', uploadError);
            throw new Error('فشل رفع الصورة');
        }

        const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);

        image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('offers').insert([
        {
            title,
            description,
            discount_label,
            image_url,
            is_active: true
        }
    ]);

    if (error) {
        console.error('Error adding offer:', error);
        throw new Error('فشل إضافة العرض');
    }

    revalidatePath('/');
    revalidatePath('/admin/offers');
    redirect('/admin/offers');
}

export async function toggleOfferStatus(id: number, currentStatus: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('offers')
        .update({ is_active: !currentStatus })
        .eq('id', id);

    if (error) {
        console.error('Error toggling offer status:', error);
        return { success: false };
    }

    revalidatePath('/');
    revalidatePath('/admin/offers');
    return { success: true };
}

export async function deleteOffer(id: number) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting offer:', error);
        return { success: false };
    }

    revalidatePath('/');
    revalidatePath('/admin/offers');
    return { success: true };
}
