import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import familyFeastImage from "@/assets/combo-family-feast.jpg";
import healthyChoiceImage from "@/assets/combo-healthy-choice.jpg";
import sweetIndulgenceImage from "@/assets/combo-sweet-indulgence.jpg";

const comboImages = [familyFeastImage, healthyChoiceImage, sweetIndulgenceImage];

const combos = [
  {
    title: "Family Feast",
    description: "Perfect meal for the whole family with a variety of delicious dishes",
    items: ["Mixed Appetizers", "3 Main Courses", "Fresh Salad", "Dessert Platter"],
    category: "Main Courses"
  },
  {
    title: "Healthy Choice",
    description: "Nutritious and delicious options for health-conscious diners",
    items: ["Garden Fresh Salad", "Grilled Protein", "Fruit Bowl", "Green Smoothie"],
    category: "Appetizers"
  },
  {
    title: "Sweet Indulgence",
    description: "Satisfy your sweet tooth with our premium dessert selection",
    items: ["Chocolate Cake", "Fresh Fruit Tart", "Ice Cream", "Fresh Juice"],
    category: "Desserts"
  }
];

const FeaturedLooks = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Meal Combos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete meals carefully curated for the perfect dining experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {combos.map((combo, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-2 hover:border-primary transition-smooth shadow-card hover:shadow-elegant"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={comboImages[index]} 
                  alt={combo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-smooth">
                  {combo.title}
                </h3>
                <p className="text-muted-foreground mb-4">{combo.description}</p>
                <ul className="space-y-2 mb-6">
                  {combo.items.map((item, i) => (
                    <li key={i} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full shadow-md"
                  onClick={() => navigate(`/shop?category=${encodeURIComponent(combo.category)}`)}
                >
                  Order This Combo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLooks;
