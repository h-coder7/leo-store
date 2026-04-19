"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getBanners() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching banners:', error);
        return [];
    }
    return data || [];
}

export async function getAllBanners() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all banners:', error);
        return [];
    }
    return data || [];
}

export async function addBanner(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const color = formData.get('color') as string || 'from-blue-600/80 to-blue-900/80';
    const link_url = formData.get('link_url') as string || '/products';
    const button_text = formData.get('button_text') as string || 'تسوق الآن';
    
    // Image handling
    const imageFile = formData.get('image') as File;
    let image_url = '';

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `banners/${Date.now()}.${fileExt}`;

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(fileName, buffer, {
                contentType: imageFile.type,
                upsert: false
            });

        if (uploadError) {
            console.error('Error uploading banner image:', uploadError);
            throw new Error('فشل رفع الصورة');
        }

        const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);

        image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('banners').insert([
        {
            title,
            description,
            image_url,
            color,
            link_url,
            button_text,
            is_active: true
        }
    ]);

    if (error) {
        console.error('Error adding banner:', error);
        throw new Error('فشل إضافة البنر');
    }

    revalidatePath('/');
    revalidatePath('/admin/banners');
    redirect('/admin/banners');
}

export async function toggleBannerStatus(id: number, currentStatus: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('banners')
        .update({ is_active: !currentStatus })
        .eq('id', id);

    if (error) {
        console.error('Error toggling banner status:', error);
        return { success: false };
    }

    revalidatePath('/');
    revalidatePath('/admin/banners');
    return { success: true };
}

export async function deleteBanner(id: number) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting banner:', error);
        return { success: false };
    }

    revalidatePath('/');
    revalidatePath('/admin/banners');
    return { success: true };
}
