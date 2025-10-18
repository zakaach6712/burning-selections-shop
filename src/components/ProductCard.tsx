import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Package } from "lucide-react";
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
}

const ProductCard = ({ id, image, name, price, category, isNew }: ProductCardProps) => {
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
      <div className="relative overflow-hidden bg-muted flex items-center justify-center min-h-[320px]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <Package className="h-24 w-24 text-muted-foreground/30" />
        )}
        {!category && (
          <span className="absolute top-4 left-4 bg-muted/90 text-muted-foreground px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
            Uncategorized
          </span>
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
        {category && (
          <div className="mb-2">
            <span className="text-sm text-muted-foreground uppercase tracking-wide">
              {category}
            </span>
          </div>
        )}
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-primary">
            ${price}
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
