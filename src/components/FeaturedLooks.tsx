import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const looks = [
  {
    title: "Modest Luxe",
    description: "Elegant abayas paired with premium accessories for timeless sophistication",
    items: ["Black Embroidered Abaya", "Silk Hijab", "Gold Jewelry Set"],
    gradient: "from-primary/30 to-secondary/20"
  },
  {
    title: "Urban Flow",
    description: "Complete streetwear ensemble for the modern trendsetter",
    items: ["Oversized Hoodie", "Tapered Joggers", "Premium Sneakers"],
    gradient: "from-secondary/30 to-accent/20"
  },
  {
    title: "Cultural Pride",
    description: "Traditional Moroccan elegance meets contemporary comfort",
    items: ["Heritage Thobe", "Embroidered Cap", "Leather Slippers"],
    gradient: "from-accent/30 to-primary/20"
  }
];

const FeaturedLooks = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured Looks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated outfits combining style, comfort, and cultural authenticity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {looks.map((look, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-2 hover:border-primary transition-smooth shadow-card hover:shadow-elegant"
            >
              <div className={`h-64 bg-gradient-to-br ${look.gradient} flex items-center justify-center`}>
                <span className="text-8xl opacity-50">
                  {index === 0 ? "👗" : index === 1 ? "🔥" : "🕌"}
                </span>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-smooth">
                  {look.title}
                </h3>
                <p className="text-muted-foreground mb-4">{look.description}</p>
                <ul className="space-y-2 mb-6">
                  {look.items.map((item, i) => (
                    <li key={i} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full shadow-md">Shop This Look</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLooks;
