import { Home, Presentation, Wrench, FileText, Share2, User, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserAvatar } from "./UserAvatar";
import logoImage from "@assets/generated_images/Dovito_EDU_square_logo_1e2e311b.png";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Workshop", url: "/workshop", icon: Presentation },
  { title: "AI Tools", url: "/ai-tools", icon: Wrench },
  { title: "Prompt Library", url: "/prompts", icon: FileText },
  { title: "Media Links", url: "/media", icon: Share2 },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard">
          <a className="flex items-center gap-3 hover-elevate rounded-lg p-2" data-testid="link-logo">
            <img src={logoImage} alt="Dovito EDU" className="h-10 w-10 rounded-md" />
            <div>
              <h1 className="font-heading font-bold text-lg">Dovito EDU</h1>
              <p className="text-xs text-muted-foreground">Learn & Grow</p>
            </div>
          </a>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url}>
                      <a data-testid={`link-${item.title.toLowerCase().replace(" ", "-")}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
          <UserAvatar name="John Doe" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
          <button 
            onClick={() => console.log("Logout clicked")}
            data-testid="button-logout"
            className="hover-elevate active-elevate-2 rounded-md p-1.5"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
