import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// رفع صورة
export async function uploadImage(file: File, folder: string = 'products') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}.${fileExt}`

    const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file)

    if (error) throw error

    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)

    return data.publicUrl
}

// حذف صورة
export async function deleteImage(url: string) {
    const path = url.split('/images/')[1]

    const { error } = await supabase.storage
        .from('images')
        .remove([path])

    if (error) throw error
}