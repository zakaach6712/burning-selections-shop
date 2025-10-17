import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fashion.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion collection featuring streetwear and modest fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
            Fashion That{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              Celebrates
            </span>{" "}
            Every Culture
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            From elegant modest wear to bold streetwear. Discover premium fashion
            that honors tradition and embraces modern style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8 shadow-elegant"
              onClick={() => navigate('/shop')}
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-2"
              onClick={() => navigate('/shop')}
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
