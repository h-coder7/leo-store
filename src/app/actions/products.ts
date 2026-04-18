"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Product, Section } from '@/lib/supabase/types';

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data ?? [];
}

export async function getSections(): Promise<Section[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching sections:', error);
    return [];
  }

  return data ?? [];
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const sectionRaw = formData.get('section_id') as string;
  const section_id = sectionRaw ? parseInt(sectionRaw, 10) : null;
  const season = (formData.get('season') as Product['season']) || null;

  // Arrays: sizes & colors come as multiple checkbox values
  const sizes = formData.getAll('sizes') as string[];
  const colors = formData.getAll('colors') as string[];

  // Images: one URL per line inside textarea
  const imagesRaw = (formData.get('images') as string) ?? '';
  const images = imagesRaw
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const { error } = await supabase.from('products').insert([
    {
      name,
      price: isNaN(price) ? 0 : price,
      section_id: section_id && !isNaN(section_id) ? section_id : null,
      images,
      sizes,
      colors,
      season,
    },
  ]);

  if (error) {
    console.error('Error inserting product:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/');

  redirect('/admin/products');
}

export async function addSection(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name') as string;
  const image_url = (formData.get('image_url') as string) || null;
  const parent = (formData.get('parent') as Section['parent']) || null;

  const { error } = await supabase.from('sections').insert([{ name, image_url, parent }]);

  if (error) {
    console.error('Error inserting section:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/sections');
  revalidatePath('/');

  redirect('/admin/sections');
}
