import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  const links = {
    shop: ["Appetizers", "Main Courses", "Desserts", "Beverages", "Specials"],
    company: ["About Us", "Contact", "Careers", "Press"],
    support: ["FAQ", "Delivery", "Reservations", "Catering"],
  };

  const handleLinkClick = (link: string) => {
    if (link === "About Us") {
      navigate("/about");
    } else if (link === "Contact") {
      window.location.href = "tel:0758630933";
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-black text-primary mb-4">
              Honey <span className="text-secondary">Flavors</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Fresh, organic food crafted with love. From appetizers to desserts,
              discover delicious dishes made with the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/zakariya_abdulrazaq_yussuf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Visit our Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              {links.shop.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link}>
                  <a 
                    href={link === "Contact" ? "tel:0758630933" : "#"} 
                    onClick={(e) => {
                      if (link === "About Us") {
                        e.preventDefault();
                        handleLinkClick(link);
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-smooth cursor-pointer"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Honey Flavors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
