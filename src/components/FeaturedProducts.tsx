import ProductCard from "./ProductCard";
import hoodieImage from "@/assets/product-hoodie.jpg";
import abayaImage from "@/assets/product-abaya.jpg";
import sneakersImage from "@/assets/product-sneakers.jpg";
import thobeImage from "@/assets/product-thobe.jpg";

// Sample menu items - replace with actual items from database
const products = [
  {
    id: "featured-2",
    image: abayaImage,
    name: "Elegance Abaya",
    price: 3500,
    category: "Modest Wear",
    isNew: true
  },
  {
    id: "featured-3",
    image: sneakersImage,
    name: "Gold Rush Sneakers",
    price: 4500,
    category: "Footwear",
    isNew: false
  },
  {
    id: "featured-4",
    image: thobeImage,
    name: "Heritage Thobe",
    price: 2800,
    category: "Traditional",
    isNew: false
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
