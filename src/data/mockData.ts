export const mockProducts = [
  // Cakes
  {
    id: '1',
    name: 'Schokoladentorte Deluxe',
    description: 'Dreischichtige Schokoladentorte mit Ganache und Beeren',
    price: 45.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    popular: true,
  },
  {
    id: '2',
    name: 'Erdbeertorte Classic',
    description: 'Luftiger Biskuit mit Erdbeeren und Sahne',
    price: 38.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    popular: true,
  },
  {
    id: '3',
    name: 'Red Velvet Torte',
    description: 'Klassische Red Velvet mit Cream Cheese Frosting',
    price: 42.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
    popular: false,
  },
  {
    id: '4',
    name: 'Zitronen-Baiser-Torte',
    description: 'Frische Zitronencreme mit knusprigem Baiser',
    price: 40.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80',
    popular: false,
  },
  {
    id: '5',
    name: 'Schwarzwälder Kirschtorte',
    description: 'Traditionelle deutsche Torte mit Kirschen und Sahne',
    price: 44.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    popular: true,
  },
  {
    id: '6',
    name: 'Karamell-Walnuss-Torte',
    description: 'Nussiger Boden mit cremigem Karamell',
    price: 46.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80',
    popular: false,
  },
  
  // Cookies
  {
    id: '7',
    name: 'Chocolate Chip Cookies (12 Stk)',
    description: 'Klassische Cookies mit belgischer Schokolade',
    price: 15.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
    popular: true,
  },
  {
    id: '8',
    name: 'Doppel-Schokoladen-Cookies (12 Stk)',
    description: 'Für echte Schokoladenliebhaber',
    price: 16.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
    popular: false,
  },
  {
    id: '9',
    name: 'Haferflocken-Rosinen-Cookies (12 Stk)',
    description: 'Gesunde und leckere Cookies',
    price: 14.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1590841609987-4ac211afdde1?w=800&q=80',
    popular: false,
  },
  {
    id: '10',
    name: 'Macadamia-Cookies (12 Stk)',
    description: 'Premium Cookies mit ganzen Macadamianüssen',
    price: 18.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800&q=80',
    popular: false,
  },
  {
    id: '11',
    name: 'Bunte Zuckerkekse (24 Stk)',
    description: 'Perfekt für Kindergeburtstage und Feiern',
    price: 20.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80',
    popular: true,
  },
  {
    id: '12',
    name: 'Erdnussbutter-Cookies (12 Stk)',
    description: 'Cremig und voller Geschmack',
    price: 15.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80',
    popular: false,
  },
];

// Mock database schema documentation
export const databaseSchema = {
  profiles: {
    id: 'uuid (primary key)',
    user_id: 'uuid (foreign key to auth.users)',
    name: 'text',
    email: 'text',
    phone: 'text',
    created_at: 'timestamp',
  },
  
  addresses: {
    id: 'uuid (primary key)',
    user_id: 'uuid (foreign key to profiles)',
    name: 'text (e.g. "Zu Hause", "Büro")',
    street: 'text',
    city: 'text',
    zip_code: 'text',
    country: 'text',
    is_default: 'boolean',
    created_at: 'timestamp',
  },
  
  orders: {
    id: 'uuid (primary key)',
    user_id: 'uuid (foreign key to profiles)',
    address_id: 'uuid (foreign key to addresses)',
    status: 'text (Pending Review, Approved, Rejected, Completed)',
    total_amount: 'decimal',
    created_at: 'timestamp',
    delivery_date: 'date',
    notes: 'text',
  },
  
  order_items: {
    id: 'uuid (primary key)',
    order_id: 'uuid (foreign key to orders)',
    product_id: 'uuid (reference to products if catalog exists)',
    product_name: 'text',
    quantity: 'integer',
    unit_price: 'decimal',
    subtotal: 'decimal',
  },
  
  custom_orders: {
    id: 'uuid (primary key)',
    user_id: 'uuid (foreign key to profiles)',
    cake_type: 'text',
    size: 'text',
    flavor: 'text',
    filling: 'text',
    decoration: 'text',
    allergies: 'text',
    special_wishes: 'text',
    delivery_method: 'text (delivery, pickup)',
    delivery_date: 'date',
    delivery_address: 'text',
    status: 'text (Pending, Quoted, Approved, In Production, Completed)',
    quoted_price: 'decimal',
    contact_name: 'text',
    contact_email: 'text',
    contact_phone: 'text',
    created_at: 'timestamp',
  },
  
  products: {
    id: 'uuid (primary key)',
    name: 'text',
    description: 'text',
    price: 'decimal',
    category: 'text (cakes, cookies)',
    image_url: 'text',
    is_popular: 'boolean',
    is_available: 'boolean',
    created_at: 'timestamp',
  },
};

// SQL Scripts for Supabase setup
export const supabaseSetupSQL = `
-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_orders ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Addresses RLS Policies
CREATE POLICY "Users can view own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- Orders RLS Policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items RLS Policies
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Custom Orders RLS Policies
CREATE POLICY "Users can view own custom orders" ON custom_orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own custom orders" ON custom_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products (Public Read)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (is_available = true);
`;
