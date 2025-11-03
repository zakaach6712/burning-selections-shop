import ProductCard from "./ProductCard";
import appetizer1 from "@/assets/food-appetizer-1.jpg";
import appetizer2 from "@/assets/food-appetizer-2.jpg";
import main1 from "@/assets/food-main-1.jpg";
import main2 from "@/assets/food-main-2.jpg";
import dessert1 from "@/assets/food-dessert-1.jpg";
import dessert2 from "@/assets/food-dessert-2.jpg";
import beverage1 from "@/assets/food-beverage-1.jpg";
import beverage2 from "@/assets/food-beverage-2.jpg";

// Sample menu items - replace with actual items from database
const products = [
  {
    id: "featured-1",
    image: appetizer1,
    name: "Mediterranean Platter",
    price: 850,
    category: "Appetizers",
    rating: 4.8
  },
  {
    id: "featured-2",
    image: main1,
    name: "Grilled Steak",
    price: 2200,
    category: "Main Courses",
    rating: 4.9
  },
  {
    id: "featured-3",
    image: dessert1,
    name: "Chocolate Lava Cake",
    price: 650,
    category: "Desserts",
    rating: 4.7
  },
  {
    id: "featured-4",
    image: beverage1,
    name: "Fresh Mango Smoothie",
    price: 450,
    category: "Beverages",
    rating: 4.6
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured Menu Items
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked dishes made with fresh, organic ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
