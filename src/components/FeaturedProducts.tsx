import ProductCard from "./ProductCard";
import hoodieImage from "@/assets/product-hoodie.jpg";
import abayaImage from "@/assets/product-abaya.jpg";
import sneakersImage from "@/assets/product-sneakers.jpg";
import thobeImage from "@/assets/product-thobe.jpg";

// These are display-only products with placeholder IDs
const products = [
  {
    image: hoodieImage,
    name: "Urban Legend Hoodie",
    price: 89,
    category: "Streetwear",
    isNew: true
  },
  {
    image: abayaImage,
    name: "Elegance Abaya",
    price: 129,
    category: "Modest Wear",
    isNew: true
  },
  {
    image: sneakersImage,
    name: "Gold Rush Sneakers",
    price: 149,
    category: "Footwear",
    isNew: false
  },
  {
    image: thobeImage,
    name: "Heritage Thobe",
    price: 159,
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
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked styles that blend culture, comfort, and modern aesthetics
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
