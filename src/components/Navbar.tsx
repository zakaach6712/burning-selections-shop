import { ShoppingBag, Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut, isSupplier } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Women's Modest", path: "/shop?category=Modest Wear" },
    { name: "Men's Streetwear", path: "/shop?category=Streetwear" },
    { name: "Sneakers", path: "/shop?category=Footwear" },
    { name: "Moroccan Traditional", path: "/shop?category=Traditional" },
    { name: "Boys Swag", path: "/shop?category=Boys" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="font-display text-2xl font-black text-primary">
              Burnings <span className="text-secondary">Selections</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => navigate('/search')}
            >
              <Search className="h-5 w-5" />
            </Button>
            {user ? (
              <>
                {isSupplier && (
                  <Button variant="ghost" onClick={() => navigate('/supplier')} className="hidden md:flex">
                    Dashboard
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
                  <LogOut className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" onClick={() => navigate('/auth')}>
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <Link
              to="/search"
              className="block w-full text-left py-2 px-4 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="inline h-4 w-4 mr-2" />
              Search
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block w-full text-left py-2 px-4 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-smooth"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
