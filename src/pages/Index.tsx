import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import ShopByCulture from "@/components/ShopByCulture";
import FeaturedLooks from "@/components/FeaturedLooks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <ShopByCulture />
      <FeaturedLooks />
      <Footer />
    </div>
  );
};

export default Index;
