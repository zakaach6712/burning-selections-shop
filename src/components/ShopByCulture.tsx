import { Button } from "@/components/ui/button";

const cultures = [
  { name: "Islamic Elegance", icon: "🕌", color: "primary" },
  { name: "Hip-Hop Culture", icon: "🎤", color: "secondary" },
  { name: "Moroccan Heritage", icon: "🌙", color: "accent" },
  { name: "Urban Streetwear", icon: "🏙️", color: "primary" }
];

const ShopByCulture = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Shop by Culture
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrate diversity through fashion that honors traditions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {cultures.map((culture) => (
            <Button
              key={culture.name}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:border-primary shadow-card hover:shadow-elegant transition-smooth"
            >
              <span className="text-2xl mr-3">{culture.icon}</span>
              {culture.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCulture;
