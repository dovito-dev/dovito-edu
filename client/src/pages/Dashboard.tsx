import { ArrowRight, Presentation, Wrench, FileText, Share2 } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Workshop, AITool, Prompt, Session } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get("auth");
    
    if (authStatus === "success") {
      toast({
        title: "Welcome!",
        description: "You've successfully signed in with Google.",
      });
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [toast]);
  const { data: workshops = [] } = useQuery<Workshop[]>({
    queryKey: ["/api/workshops"],
  });

  const { data: tools = [] } = useQuery<AITool[]>({
    queryKey: ["/api/ai-tools"],
  });

  const { data: prompts = [] } = useQuery<Prompt[]>({
    queryKey: ["/api/prompts"],
  });

  const totalSessions = workshops.reduce((total, workshop) => {
    return total + ((workshop as any).sessionCount ?? 0);
  }, 0);

  const contentSections = [
    {
      title: "AI Workshops",
      description: "Interactive slide decks and comprehensive learning materials",
      icon: Presentation,
      url: "/workshop",
      badge: `${workshops.length} ${workshops.length === 1 ? 'Workshop' : 'Workshops'}`,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "AI Tools Directory",
      description: "Curated index of AI tools with pricing and features",
      icon: Wrench,
      url: "/ai-tools",
      badge: `${tools.length}+ Tools`,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Prompt Library",
      description: "Professional prompts ready to copy and use",
      icon: FileText,
      url: "/prompts",
      badge: `${prompts.length}+ Prompts`,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Media Links",
      description: "YouTube, Instagram, X, and more resources",
      icon: Share2,
      url: "/media",
      badge: "Social Media",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Welcome Back!</h1>
        <p className="text-lg text-muted-foreground">
          Continue your learning journey with our curated resources
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contentSections.map((section) => (
          <Link key={section.title} href={section.url}>
            <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer h-full group">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <section.icon className={`h-5 w-5 ${section.color}`} />
                    </div>
                    <Badge variant="secondary" data-testid={`badge-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      {section.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {section.description}
                  </CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Your educational hub at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-primary">{workshops.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Workshops</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-primary">{tools.length}</p>
              <p className="text-sm text-muted-foreground mt-1">AI Tools</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-primary">{prompts.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Prompts</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-primary">{totalSessions}</p>
              <p className="text-sm text-muted-foreground mt-1">Sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
