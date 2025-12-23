import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

// Types
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  name: string;
  street: string;
  city: string;
  zip_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  address_id?: string;
  status: string;
  total_amount: number;
  delivery_date?: string;
  notes?: string;
  created_at: string;
  addresses?: Address;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface CustomOrder {
  id: string;
  user_id?: string;
  cake_type: string;
  size: string;
  flavor: string;
  filling: string;
  decoration?: string;
  allergies?: string;
  special_wishes?: string;
  delivery_method: string;
  delivery_date: string;
  delivery_address?: string;
  status: string;
  quoted_price?: number;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_popular: boolean;
  is_available: boolean;
  created_at: string;
}
