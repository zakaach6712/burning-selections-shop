-- Add rating column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating numeric CHECK (rating >= 0 AND rating <= 5) DEFAULT 0;

-- Update categories to food categories
UPDATE categories SET 
  name = 'Appetizers',
  slug = 'appetizers',
  description = 'Start your meal with our delicious appetizers'
WHERE slug = 'womens-modest';

UPDATE categories SET 
  name = 'Main Courses',
  slug = 'main-courses',
  description = 'Hearty and satisfying main dishes'
WHERE slug = 'mens-streetwear';

UPDATE categories SET 
  name = 'Desserts',
  slug = 'desserts',
  description = 'Sweet treats to end your meal'
WHERE slug = 'traditional';

UPDATE categories SET 
  name = 'Beverages',
  slug = 'beverages',
  description = 'Refreshing drinks and beverages'
WHERE slug = 'boys-collection';

-- Delete or update remaining categories
DELETE FROM categories WHERE slug NOT IN ('appetizers', 'main-courses', 'desserts', 'beverages', 'footwear');

-- Update footwear to appetizers if it exists
UPDATE categories SET 
  name = 'Appetizers',
  slug = 'appetizers',
  description = 'Start your meal with our delicious appetizers'
WHERE slug = 'footwear' AND NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'appetizers');