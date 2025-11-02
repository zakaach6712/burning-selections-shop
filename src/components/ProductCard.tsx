import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Package, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  image: string;
  name: string;
  price: number;
  category?: string;
  isNew?: boolean;
  rating?: number;
}

const ProductCard = ({ id, image, name, price, category, isNew, rating = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (id) {
      addToCart(id);
    }
  };

  return (
    <Card className="group overflow-hidden border-2 hover:border-primary transition-smooth shadow-card hover:shadow-elegant">
      <div className="relative overflow-hidden bg-muted aspect-square">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-24 w-24 text-muted-foreground/30" />
          </div>
        )}
        {isNew && (
          <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
            New
          </span>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth shadow-lg"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wide">
            {category || 'Food'}
          </span>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "fill-accent text-accent"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-primary">
            KSh {price.toLocaleString()}
          </span>
          <Button size="sm" className="shadow-md" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;