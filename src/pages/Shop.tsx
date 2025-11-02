import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from("products").select("*, categories(name)");
      
      if (category) {
        query = query.eq("categories.name", category);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform data to match Product interface
      const transformedProducts = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.categories?.name || 'Uncategorized',
        image: item.images?.[0] || '/placeholder.svg'
      }));
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {category ? `${category}` : "Our Menu"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {category
              ? `Fresh ${category.toLowerCase()} prepared daily`
              : "Browse our complete menu of delicious food"}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                category={product.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No menu items found in this category yet.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
