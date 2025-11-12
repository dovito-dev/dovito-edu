import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/hooks/useSession";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMediaProfileSchema, type InsertMediaProfile, type MediaProfile } from "@shared/schema";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const categories = ["Business", "Marketing", "Technology", "Real Estate", "Finance", "Personal Development"];

export default function AdminMediaProfiles() {
  const { toast } = useToast();
  const { isAdmin, isLoading: sessionLoading } = useSession();
  const [, setLocation] = useLocation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<MediaProfile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<MediaProfile | null>(null);

  useEffect(() => {
    if (!sessionLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      setLocation("/dashboard");
    }
  }, [isAdmin, sessionLoading, setLocation, toast]);

  const { data: profiles = [], isLoading } = useQuery<MediaProfile[]>({
    queryKey: ["/api/media-profiles"],
  });

  if (sessionLoading || !isAdmin) {
    return null;
  }

  const form = useForm<InsertMediaProfile>({
    resolver: zodResolver(insertMediaProfileSchema),
    defaultValues: {
      name: "",
      bio: "",
      title: "",
      category: "",
      avatar: "",
      youtubeUrl: "",
      instagramUrl: "",
      xUrl: "",
      linkedinUrl: "",
      tiktokUrl: "",
      websiteUrl: "",
      featured: 0,
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertMediaProfile) =>
      apiRequest("POST", "/api/admin/media-profiles", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-profiles"] });
      setIsCreateOpen(false);
      form.reset();
      toast({ title: "Success", description: "Media profile created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create media profile", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertMediaProfile> }) =>
      apiRequest("PATCH", `/api/admin/media-profiles/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-profiles"] });
      setEditingProfile(null);
      form.reset();
      toast({ title: "Success", description: "Media profile updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update media profile", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/media-profiles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-profiles"] });
      setDeletingProfile(null);
      toast({ title: "Success", description: "Media profile deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete media profile", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertMediaProfile) => {
    if (editingProfile) {
      updateMutation.mutate({ id: editingProfile.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (profile: MediaProfile) => {
    setEditingProfile(profile);
    form.reset({
      name: profile.name,
      bio: profile.bio,
      title: profile.title || "",
      category: profile.category || "",
      avatar: profile.avatar || "",
      youtubeUrl: profile.youtubeUrl || "",
      instagramUrl: profile.instagramUrl || "",
      xUrl: profile.xUrl || "",
      linkedinUrl: profile.linkedinUrl || "",
      tiktokUrl: profile.tiktokUrl || "",
      websiteUrl: profile.websiteUrl || "",
      featured: profile.featured,
      sortOrder: profile.sortOrder,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">Manage Media Profiles</h1>
          <p className="text-lg text-muted-foreground">
            Add, edit, or remove recommended people and influencers
          </p>
        </div>
        <Dialog
          open={isCreateOpen || editingProfile !== null}
          onOpenChange={(open) => {
            if (!open) {
              setIsCreateOpen(false);
              setEditingProfile(null);
              form.reset();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsCreateOpen(true)} data-testid="button-create-profile">
              <Plus className="h-4 w-4 mr-2" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProfile ? "Edit Media Profile" : "Create Media Profile"}</DialogTitle>
              <DialogDescription>
                {editingProfile ? "Update the profile information" : "Add a new recommended person or influencer"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Dan Martell" data-testid="input-profile-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} placeholder="SaaS Coach & Entrepreneur" data-testid="input-profile-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief bio..." data-testid="input-profile-bio" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (optional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger data-testid="select-profile-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar URL (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} placeholder="https://..." data-testid="input-profile-avatar" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Social Media Links (all optional)</h3>
                  <FormField
                    control={form.control}
                    name="youtubeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="https://youtube.com/@..." data-testid="input-profile-youtube" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagramUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="https://instagram.com/..." data-testid="input-profile-instagram" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="xUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>X (Twitter) URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="https://x.com/..." data-testid="input-profile-x" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="https://linkedin.com/in/..." data-testid="input-profile-linkedin" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tiktokUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TikTok URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="https://tiktok.com/@..." data-testid="input-profile-tiktok" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="https://..." data-testid="input-profile-website" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured</FormLabel>
                        <Select onValueChange={(val) => field.onChange(parseInt(val))} value={(field.value || 0).toString()}>
                          <FormControl>
                            <SelectTrigger data-testid="select-profile-featured">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            value={field.value || 0}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-profile-sort-order"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-profile"
                  >
                    {editingProfile ? "Update" : "Create"} Profile
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <div className="text-center py-12"><p className="text-muted-foreground">Loading...</p></div>}

      <div className="grid grid-cols-1 gap-4">
        {!isLoading && profiles.map((profile) => (
          <Card key={profile.id} data-testid={`admin-profile-card-${profile.id}`}>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{profile.name}</CardTitle>
                    {profile.title && <CardDescription>{profile.title}</CardDescription>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(profile)}
                    data-testid={`button-edit-${profile.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletingProfile(profile)}
                    data-testid={`button-delete-${profile.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{profile.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deletingProfile !== null} onOpenChange={(open) => !open && setDeletingProfile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingProfile?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingProfile && deleteMutation.mutate(deletingProfile.id)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
