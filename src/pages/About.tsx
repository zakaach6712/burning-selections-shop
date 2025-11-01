import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Globe, Users, Sparkles } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Where Culture Meets Contemporary Fashion
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <h2 className="font-display text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Burnings Selections, we believe fashion is more than clothing—it's a celebration of identity, 
              heritage, and self-expression. We curate premium pieces that honor cultural traditions while 
              embracing modern aesthetics, creating a space where everyone can find styles that resonate with 
              their unique story.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-8 w-8 text-secondary" />
              <h2 className="font-display text-3xl font-bold">Global Perspective</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From elegant modest wear to bold streetwear, from traditional Moroccan heritage pieces to 
              contemporary urban styles—we bridge cultures and create connections through fashion. Every 
              piece in our collection tells a story of craftsmanship, quality, and cultural pride.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-muted/30 rounded-2xl p-12 mb-20">
          <h2 className="font-display text-4xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                Every item is carefully selected for exceptional quality, comfort, and durability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Inclusive Community</h3>
              <p className="text-muted-foreground">
                Fashion for everyone. We celebrate diversity and welcome all cultures and styles.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Cultural Respect</h3>
              <p className="text-muted-foreground">
                We honor traditions while embracing innovation, creating bridges between heritage and modernity.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Join Our Fashion Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover styles that celebrate your unique identity. From modest elegance to streetwear edge, 
            find pieces that speak to who you are.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/shop")} className="shadow-elegant">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = "tel:0758630933"}>
              Contact Us
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
