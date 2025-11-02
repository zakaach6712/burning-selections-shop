import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categoryIcons: Record<string, string> = {
  "womens-modest": "👗",
  "mens-streetwear": "🔥",
  "footwear": "👟",
  "traditional": "🕌",
  "boys-collection": "🧢",
  "accessories": "✨"
};

const categoryGradients: Record<string, string> = {
  "womens-modest": "from-primary/20 to-secondary/20",
  "mens-streetwear": "from-secondary/20 to-accent/20",
  "footwear": "from-accent/20 to-primary/20",
  "traditional": "from-primary/20 to-accent/20",
  "boys-collection": "from-secondary/20 to-primary/20",
  "accessories": "from-accent/20 to-secondary/20"
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, description')
        .eq('slug', 'footwear')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Premium Footwear Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step into style with our exclusive selection of sneakers and premium shoes
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => (
              <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Card
                  className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-smooth shadow-card hover:shadow-elegant h-full"
                  onClick={() => navigate(`/shop?category=${category.name}`)}
                >
                  <CardContent className="p-8">
                    <div className={`bg-gradient-to-br ${categoryGradients[category.slug] || 'from-primary/20 to-secondary/20'} rounded-2xl w-16 h-16 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-smooth`}>
                      {categoryIcons[category.slug] || "📦"}
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-smooth">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description || "Discover our collection"}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
