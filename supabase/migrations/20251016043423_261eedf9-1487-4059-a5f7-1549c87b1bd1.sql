-- Step 2: Add supplier_id to products and create policies
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES auth.users(id);

-- Create index for supplier products lookup
CREATE INDEX IF NOT EXISTS idx_products_supplier_id ON public.products(supplier_id);

-- Drop existing conflicting policies first
DROP POLICY IF EXISTS "Suppliers can view their own products" ON public.products;
DROP POLICY IF EXISTS "Suppliers can insert their own products" ON public.products;
DROP POLICY IF EXISTS "Suppliers can update their own products" ON public.products;
DROP POLICY IF EXISTS "Suppliers can delete their own products" ON public.products;

-- Update RLS policies for suppliers
CREATE POLICY "Suppliers can view their own products"
ON public.products
FOR SELECT
USING (
  auth.uid() = supplier_id OR 
  is_active = true OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Suppliers can insert their own products"
ON public.products
FOR INSERT
WITH CHECK (
  auth.uid() = supplier_id AND 
  has_role(auth.uid(), 'supplier'::app_role)
);

CREATE POLICY "Suppliers can update their own products"
ON public.products
FOR UPDATE
USING (
  auth.uid() = supplier_id OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Suppliers can delete their own products"
ON public.products
FOR DELETE
USING (
  auth.uid() = supplier_id OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product images
CREATE POLICY "Anyone can view product images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Suppliers can upload product images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  has_role(auth.uid(), 'supplier'::app_role)
);

CREATE POLICY "Suppliers can update their product images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Suppliers can delete their product images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);