import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Users, Wrench, BookOpen, Lightbulb, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { useToast } from "@/hooks/use-toast";

const adminSections = [
  {
    title: "AI Tools",
    description: "Manage AI tools, categories, and descriptions",
    icon: Wrench,
    href: "/admin/ai-tools",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Media Profiles",
    description: "Manage recommended people and influencers",
    icon: Users,
    href: "/admin/media-profiles",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    title: "Workshops",
    description: "Upload and manage workshop content",
    icon: BookOpen,
    href: "/admin/workshops",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    title: "Prompt Library",
    description: "Manage AI prompts and templates",
    icon: Lightbulb,
    href: "/admin/prompts",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
];

export default function AdminDashboard() {
  const { isAdmin, isLoading } = useSession();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      });
      setLocation("/dashboard");
    }
  }, [isAdmin, isLoading, setLocation, toast]);

  if (isLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage all content and settings for Dovito EDU
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="hover-elevate transition-all cursor-pointer" data-testid={`admin-card-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardHeader>
                <div className={`p-3 rounded-lg ${section.bgColor} w-fit mb-3`}>
                  <section.icon className={`h-8 w-8 ${section.color}`} />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" data-testid={`button-manage-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  Manage {section.title}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
