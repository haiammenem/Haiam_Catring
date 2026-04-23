-- ==============================================
-- SUPABASE MIGRATION SCRIPT
-- Run in Supabase Console: Database → SQL Editor
-- ==============================================

-- 1. Create categories table
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamp DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 2. Insert initial 5 categories
INSERT INTO public.categories (name_en, name_ar, "order") VALUES
  ('Chicken & Poultry', 'الدجاج والدواجن', 1),
  ('Grills & Tagines', 'الشوايات والطاجنات', 2),
  ('Oven Trays & Sides', 'صواني الفرن والأطباق الجانبية', 3),
  ('Rice & Mahashi', 'الأرز والمحاشي', 4),
  ('Fish & Seafood', 'السمك والمأكولات البحرية', 5);

-- 3. Add columns to menu_items table
ALTER TABLE public.menu_items
ADD COLUMN category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
ADD COLUMN portion_type text CHECK (portion_type IN ('weight', 'size')) DEFAULT NULL,
ADD COLUMN weight_value integer DEFAULT NULL,
ADD COLUMN weight_unit text CHECK (weight_unit IN ('kg', 'g')) DEFAULT NULL,
ADD COLUMN size text CHECK (size IN ('s', 'm', 'l')) DEFAULT NULL,
ADD COLUMN is_active boolean DEFAULT true;

-- 4. Migrate existing category strings to IDs (map text categories to UUIDs)
-- Note: You may need to get actual UUIDs from the categories table and update this
UPDATE public.menu_items
SET category_id = (
  SELECT id FROM public.categories 
  WHERE name_en = menu_items.category
  LIMIT 1
)
WHERE category_id IS NULL AND category IS NOT NULL;

-- 5. Set up RLS policies for categories (read-only for public)
CREATE POLICY "Allow public select" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON public.categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON public.categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON public.categories
  FOR DELETE USING (auth.role() = 'authenticated');
-- 6. Set up Storage for menu-items
-- Note: Run this after ensuring the bucket "menu-items" exists in Supabase Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('menu-items', 'menu-items', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage RLS Policies
CREATE POLICY "Public Read Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'menu-items');

CREATE POLICY "Authenticated Insert Access" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'menu-items' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated Update Access" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'menu-items' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated Delete Access" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'menu-items' AND 
    auth.role() = 'authenticated'
  );

-- 8. Set up RLS for menu_items (if not already enabled)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read menu_items" ON public.menu_items
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert menu_items" ON public.menu_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update menu_items" ON public.menu_items
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete menu_items" ON public.menu_items
  FOR DELETE USING (auth.role() = 'authenticated');