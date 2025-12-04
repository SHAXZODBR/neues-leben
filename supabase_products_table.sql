-- Create products table in Supabase
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT UNIQUE NOT NULL,
  
  -- Basic info (multi-language)
  name_en TEXT NOT NULL,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_de TEXT NOT NULL,
  
  category_en TEXT NOT NULL,
  category_uz TEXT NOT NULL,
  category_ru TEXT NOT NULL,
  category_de TEXT NOT NULL,
  
  description_en TEXT NOT NULL,
  description_uz TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_de TEXT NOT NULL,
  
  -- Features (stored as JSON arrays)
  features_en JSONB NOT NULL DEFAULT '[]'::jsonb,
  features_uz JSONB NOT NULL DEFAULT '[]'::jsonb,
  features_ru JSONB NOT NULL DEFAULT '[]'::jsonb,
  features_de JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Image and display
  image TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  
  -- Detailed medical information (HTML content)
  detailed_info_en JSONB,
  detailed_info_uz JSONB,
  detailed_info_ru JSONB,
  detailed_info_de JSONB,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  published BOOLEAN DEFAULT true
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_product_id ON products(product_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (published = true);

-- Create policy to allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Example insert statement
-- INSERT INTO products (
--   product_id,
--   name_en, name_uz, name_ru, name_de,
--   category_en, category_uz, category_ru, category_de,
--   description_en, description_uz, description_ru, description_de,
--   features_en, features_uz, features_ru, features_de,
--   image,
--   featured,
--   detailed_info_en,
--   detailed_info_uz,
--   detailed_info_ru,
--   detailed_info_de
-- ) VALUES (
--   '1',
--   'VAZOLIZIN® (L-lysine-aescinat)', 'VAZOLIZIN® (L-lizin-aescinat)', 'ВАЗОЛИЗИН® (L-lysine-aescinat)', 'VAZOLIZIN® (L-Lysin-Aescinat)',
--   'Cardiology', 'Kardiologiya', 'Кардиология', 'Kardiologie',
--   'Advanced cardiovascular treatment...', 'Yurak salomatligi...', 'Передовое лечение...', 'Fortschrittliche...',
--   '["Clinically tested", "Fast-acting formula", "Minimal side effects"]'::jsonb,
--   '["Klinik sinovdan o''tgan", "Tez ta''sir qiluvchi formula", "Minimal yon ta''sirlar"]'::jsonb,
--   '["Клинически протестировано", "Быстродействующая формула", "Минимальные побочные эффекты"]'::jsonb,
--   '["Klinisch getestet", "Schnell wirkende Formel", "Minimale Nebenwirkungen"]'::jsonb,
--   '/productImages/1.jpg',
--   true,
--   '{"indications": "<p>HTML content...</p>", "dosage": "<p>HTML content...</p>"}'::jsonb,
--   '{"indications": "<p>HTML content...</p>", "dosage": "<p>HTML content...</p>"}'::jsonb,
--   '{"indications": "<p>HTML content...</p>", "dosage": "<p>HTML content...</p>"}'::jsonb,
--   '{"indications": "<p>HTML content...</p>", "dosage": "<p>HTML content...</p>"}'::jsonb
-- );
