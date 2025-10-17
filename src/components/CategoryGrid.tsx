import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Modest Women's Wear",
    description: "Elegant abayas, hijabs & dresses",
    icon: "👗",
    gradient: "from-primary/20 to-secondary/20",
    category: "Modest Wear"
  },
  {
    title: "Streetwear",
    description: "Hoodies, joggers & graphic tees",
    icon: "🔥",
    gradient: "from-secondary/20 to-accent/20",
    category: "Streetwear"
  },
  {
    title: "Sneakers & Shoes",
    description: "Premium footwear collection",
    icon: "👟",
    gradient: "from-accent/20 to-primary/20",
    category: "Footwear"
  },
  {
    title: "Moroccan Traditional",
    description: "Authentic thobes & cultural wear",
    icon: "🕌",
    gradient: "from-primary/20 to-accent/20",
    category: "Traditional"
  },
  {
    title: "Boys Swag",
    description: "Cool casual outfits & accessories",
    icon: "🧢",
    gradient: "from-secondary/20 to-primary/20",
    category: "Boys"
  },
  {
    title: "Accessories",
    description: "Complete your look",
    icon: "✨",
    gradient: "from-accent/20 to-secondary/20",
    category: "Accessories"
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections celebrating diverse fashion cultures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-smooth shadow-card hover:shadow-elegant"
              onClick={() => navigate(`/shop?category=${category.category}`)}
            >
              <CardContent className="p-8">
                <div className={`bg-gradient-to-br ${category.gradient} rounded-2xl w-16 h-16 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-smooth`}>
                  {category.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-smooth">
                  {category.title}
                </h3>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
