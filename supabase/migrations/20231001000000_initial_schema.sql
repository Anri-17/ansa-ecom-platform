-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Users Table
create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  phone text,
  address text,
  city text,
  zip_code text,
  role text not null default 'customer' check (role in ('admin', 'customer', 'guest')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

-- Products Table
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  image text not null,
  category text not null check (category in ('jersey', 'cleats', 'accessories')),
  featured boolean not null default false,
  stock integer not null default 0 check (stock >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

-- Orders Table
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  payment_id text not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  total numeric(10, 2) not null check (total >= 0),
  items jsonb not null,
  customer_details jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

-- Payments Table
create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  payment_id text not null,
  amount numeric(10, 2) not null check (amount >= 0),
  currency text not null default 'GEL',
  method text not null check (method in ('bog', 'tbc', 'apple', 'google', 'stripe')),
  status text not null check (status in ('pending', 'success', 'failed')),
  error text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reviews Table
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  product_id uuid references products(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

-- Contact Messages Table
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read', 'replied')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for better performance
create index if not exists idx_products_category on products(category);
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_payments_order_id on payments(order_id);
create index if not exists idx_reviews_product_id on reviews(product_id);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table payments enable row level security;
alter table reviews enable row level security;
alter table contact_messages enable row level security;

-- Security Policies
-- Profiles
create policy "Users can view their own profile"
on profiles for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on profiles for update
using (auth.uid() = id);

-- Products
create policy "Public read access"
on products for select
using (true);

create policy "Admin full access"
on products for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

-- Orders
create policy "Users can manage their own orders"
on orders for all
using (user_id = auth.uid());

create policy "Admin can manage all orders"
on orders for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

-- Payments
create policy "Users can view their own payments"
on payments for select
using (exists (
  select 1 from orders
  where orders.id = payments.order_id and orders.user_id = auth.uid()
));

create policy "Admin can view all payments"
on payments for select
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

-- Reviews
create policy "Users can manage their own reviews"
on reviews for all
using (user_id = auth.uid());

create policy "Public read access"
on reviews for select
using (true);

-- Contact Messages
create policy "Admin can manage contact messages"
on contact_messages for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

-- Set up storage for product images
insert into storage.buckets (id, name)
values ('product-images', 'product-images')
on conflict do nothing;

create policy "Public read access for product images"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "Admin write access for product images"
on storage.objects for insert
with check (bucket_id = 'product-images' and exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));
