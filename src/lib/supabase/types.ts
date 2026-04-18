export type Section = {
  id: number
  name: string
  image_url: string | null
  parent: 'boy' | 'girl' | 'offers' | null
  created_at: string
}

export type Product = {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  images: string[] | null
  sizes: string[] | null
  colors: string[] | null
  season: 'صيف' | 'شتاء' | 'كل الموسم' | null
  section_id: number | null
  created_at: string
}

export type Order = {
  id: number
  customer_name: string
  phone: string
  address: string
  governorate: string
  items: OrderItem[]
  total: number
  status: 'جديد' | 'قيد التنفيذ' | 'تم الشحن' | 'ملغي'
  created_at: string
}

export type OrderItem = {
  product_id: number
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

export type CartItem = {
  product_id: number
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}