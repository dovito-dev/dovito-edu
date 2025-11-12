import { Home, Presentation, Wrench, FileText, User } from "lucide-react";
import { Link, useLocation } from "wouter";

const navItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Workshop", url: "/workshop", icon: Presentation },
  { title: "Tools", url: "/ai-tools", icon: Wrench },
  { title: "Prompts", url: "/prompts", icon: FileText },
  { title: "Profile", url: "/profile", icon: User },
];

export function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location === item.url;
          return (
            <Link 
              key={item.title} 
              href={item.url}
              className={`flex flex-col items-center justify-center gap-1 min-w-[60px] h-full rounded-lg hover-elevate active-elevate-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`mobile-nav-${item.title.toLowerCase()}`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
