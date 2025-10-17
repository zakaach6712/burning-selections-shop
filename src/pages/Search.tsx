import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query]);

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);

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
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Search Products
          </h1>
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
            <Input
              type="text"
              placeholder="Search for products, categories, or styles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="text-lg"
            />
            <Button type="submit" size="lg">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : query && products.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-6">
              Found {products.length} result{products.length !== 1 ? "s" : ""} for "{query}"
            </p>
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
          </>
        ) : query ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No products found for "{query}". Try a different search term.
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Enter a search term to find products
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Search;
