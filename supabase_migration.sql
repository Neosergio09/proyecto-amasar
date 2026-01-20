-- 1. Add columns for Stock and Price management
ALTER TABLE public.productos 
ADD COLUMN IF NOT EXISTS stock_cantidad INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS precio DECIMAL(10,2) DEFAULT 0.00;

-- 2. Enable Row Level Security
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Public Read Access
-- Allows anyone (anon and authenticated) to VIEW products
CREATE POLICY "Public Read Access" 
ON public.productos FOR SELECT 
USING (true);

-- 4. Create Policy: Admin Write Access
-- Allows only authenticated users (admins) to INSERT, UPDATE, DELETE
-- Note: In a real production app, you might check for a specific claim like (auth.jwt() ->> 'role' = 'admin')
-- For this phase, we assume any authenticated user is an admin or we just check for authenticated role.
create policy "Admin Write Access"
on public.productos for all
to authenticated
using (true)
with check (true);
