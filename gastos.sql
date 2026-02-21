-- Execute this in your Supabase SQL Editor

-- 1. Create the Gastos (Expenses) table
CREATE TABLE IF NOT EXISTS gastos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descripcion TEXT NOT NULL,
    monto NUMERIC NOT NULL CHECK (monto >= 0),
    categoria TEXT NOT NULL,
    fecha_gasto DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) -- Optional: Track which admin added it
);

-- 2. Enable RLS (Row Level Security) - Optional based on your current setup
-- ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Admins can manage expenses" ON gastos FOR ALL USING (auth.uid() IN (SELECT id FROM perfiles WHERE role = 'admin'));

-- 3. Add an index on fecha_gasto to optimize monthly filtering
CREATE INDEX IF NOT EXISTS idx_gastos_fecha ON gastos(fecha_gasto);
