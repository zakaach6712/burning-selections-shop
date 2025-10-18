import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryCarousel from "@/components/CategoryCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import ShopByCulture from "@/components/ShopByCulture";
import FeaturedLooks from "@/components/FeaturedLooks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryCarousel />
      <FeaturedProducts />
      <ShopByCulture />
      <FeaturedLooks />
      <Footer />
    </div>
  );
};

export default Index;
