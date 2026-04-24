"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Testimonial } from '@/lib/supabase/types';

export async function getTestimonials(): Promise<Testimonial[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }

    return data ?? [];
}

export async function addTestimonial(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string, 10);

    const { error } = await supabase.from('testimonials').insert([
        {
            name,
            role,
            content,
            rating: isNaN(rating) ? 5 : rating,
        },
    ]);

    if (error) {
        console.error('Error inserting testimonial:', error);
        return;
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/');

    redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting testimonial:', error);
        throw new Error('فشل حذف الرأي');
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}
