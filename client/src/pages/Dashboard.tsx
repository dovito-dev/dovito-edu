import { ArrowRight, Presentation, Wrench, FileText, Share2 } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const contentSections = [
  {
    title: "Dovito x Fairway Mortgage AI Workshop",
    description: "Interactive slide decks and comprehensive learning materials",
    icon: Presentation,
    url: "/workshop",
    badge: "12 Sessions",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "AI Tools Directory",
    description: "Curated index of AI tools with pricing and features",
    icon: Wrench,
    url: "/ai-tools",
    badge: "45+ Tools",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    title: "Prompt Library",
    description: "Professional prompts ready to copy and use",
    icon: FileText,
    url: "/prompts",
    badge: "100+ Prompts",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    title: "Media Links",
    description: "YouTube, Instagram, X, and more resources",
    icon: Share2,
    url: "/media",
    badge: "5 Platforms",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
];

export default function Dashboard() {
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
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interactions and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="p-2 rounded-md bg-background">
                <Presentation className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Completed Session 3</p>
                <p className="text-sm text-muted-foreground">AI Workshop - Introduction to LLMs</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="p-2 rounded-md bg-background">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Saved 3 new prompts</p>
                <p className="text-sm text-muted-foreground">Added to your collection</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
