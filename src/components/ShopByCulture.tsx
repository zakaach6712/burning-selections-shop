import { Button } from "@/components/ui/button";

const specials = [
  { name: "Chef's Special", icon: "👨‍🍳", color: "primary" },
  { name: "Organic Selection", icon: "🌱", color: "secondary" },
  { name: "Family Meals", icon: "🍱", color: "accent" },
  { name: "Fresh Daily", icon: "✨", color: "primary" }
];

const ShopByCulture = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Today's Specials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh ingredients, expertly prepared daily
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {specials.map((special) => (
            <Button
              key={special.name}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:border-primary shadow-card hover:shadow-elegant transition-smooth"
            >
              <span className="text-2xl mr-3">{special.icon}</span>
              {special.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCulture;
