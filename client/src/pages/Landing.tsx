import { ArrowRight, Presentation, Wrench, FileText, Share2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import LightRays from "@/components/LightRays";

const features = [
  {
    icon: Presentation,
    title: "AI Workshop Access",
    description: "Interactive slide decks and comprehensive learning materials from Dovito x Fairway Mortgage AI workshop.",
  },
  {
    icon: Wrench,
    title: "AI Tools Directory",
    description: "Curated index of AI tools with pricing, features, and use cases to power your workflow.",
  },
  {
    icon: FileText,
    title: "Prompt Library",
    description: "Copy, download, and export professional prompts to enhance your AI interactions.",
  },
  {
    icon: Share2,
    title: "Media & Resources",
    description: "Access our YouTube, Instagram, and X content all in one convenient location.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="container mx-auto">
          <div className="bg-card/70 backdrop-blur-xl border border-border rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h1 className="font-heading font-bold text-xl">Dovito EDU</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#3b82f6"
            raysSpeed={1}
            lightSpread={1}
            rayLength={1.5}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-5xl md:text-6xl mb-6">
            Elevate Your AI Journey
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Access premium workshops, comprehensive AI tools, and curated prompts—all in one modern platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg" data-testid="button-get-access">
                Get Instant Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg" data-testid="button-learn-more">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="font-heading font-bold text-4xl mb-4">
              Everything You Need to Succeed
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive resources designed for modern professionals and AI enthusiasts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="hover-elevate transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="font-heading font-bold text-4xl mb-6">
            Ready to Transform Your Learning?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals advancing their AI knowledge
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg" data-testid="button-cta-bottom">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Dovito EDU. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-privacy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-terms">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
