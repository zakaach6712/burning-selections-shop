import { Badge } from "@/components/ui/badge";
import { Clock, Flame } from "lucide-react";
import appetizer3 from "@/assets/food-appetizer-3.jpg";
import main3 from "@/assets/food-main-3.jpg";
import dessert3 from "@/assets/food-dessert-3.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const specials = [
  {
    title: "Crispy Samosas",
    description: "Golden samosas with spiced filling and fresh mint chutney",
    image: appetizer3,
    badge: "Chef's Pick",
    time: "Fresh Daily",
    icon: Flame,
  },
  {
    title: "Spicy Biryani",
    description: "Aromatic rice with tender meat and traditional spices",
    image: main3,
    badge: "Popular",
    time: "Made to Order",
    icon: Clock,
  },
  {
    title: "Fresh Fruit Tart",
    description: "Seasonal berries on custard with glazed finish",
    image: dessert3,
    badge: "Dessert Special",
    time: "While Supplies Last",
    icon: Flame,
  }
];

const ShopByCulture = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Today's Specials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh ingredients, expertly prepared daily
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
            {specials.map((special, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Card className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-smooth shadow-card hover:shadow-elegant h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={special.image}
                      alt={special.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      {special.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <special.icon className="h-4 w-4" />
                      <span>{special.time}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-smooth">
                      {special.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {special.description}
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

export default ShopByCulture;
