import { Home, Presentation, Wrench, FileText, Share2, User, LogOut, Shield, BookOpen, Lightbulb } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
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
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useSession } from "@/hooks/useSession";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Workshop", url: "/workshop", icon: Presentation },
  { title: "AI Tools", url: "/ai-tools", icon: Wrench },
  { title: "Prompt Library", url: "/prompts", icon: FileText },
  { title: "Media Links", url: "/media", icon: Share2 },
  { title: "Profile", url: "/profile", icon: User },
];

const adminItems = [
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "Manage AI Tools", url: "/admin/ai-tools", icon: Wrench },
  { title: "Manage Media", url: "/admin/media-profiles", icon: Share2 },
  { title: "Manage Workshops", url: "/admin/workshops", icon: BookOpen },
  { title: "Manage Prompts", url: "/admin/prompts", icon: Lightbulb },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const { user, isAdmin } = useSession();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout", {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard">
          <button className="flex items-center gap-3 hover-elevate rounded-lg p-2 w-full text-left">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <span className="font-heading font-bold text-lg text-primary">D</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg">Dovito EDU</h1>
              <p className="text-xs text-muted-foreground">Learn & Grow</p>
            </div>
          </button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton isActive={location === item.url} data-testid={`link-${item.title.toLowerCase().replace(" ", "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton isActive={location === item.url} data-testid={`link-admin-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
          <UserAvatar name={user?.name || user?.email || "User"} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
          </div>
          <button 
            onClick={handleLogout}
            data-testid="button-logout"
            disabled={logoutMutation.isPending}
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
