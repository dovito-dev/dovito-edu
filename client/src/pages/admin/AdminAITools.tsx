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
import { insertAIToolSchema, type InsertAITool, type AITool } from "@shared/schema";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

const categories = ["Writing", "Coding", "Image Generation", "Video", "Audio", "Research", "Productivity", "Design", "Marketing", "Data Analysis"];

export default function AdminAITools() {
  const { toast } = useToast();
  const { isAdmin, isLoading: sessionLoading } = useSession();
  const [, setLocation] = useLocation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const [deletingTool, setDeletingTool] = useState<AITool | null>(null);

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

  const { data: tools = [], isLoading } = useQuery<AITool[]>({
    queryKey: ["/api/ai-tools"],
  });

  if (sessionLoading || !isAdmin) {
    return null;
  }

  const form = useForm<InsertAITool>({
    resolver: zodResolver(insertAIToolSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      link: "",
      logo: "",
      features: [""],
      useCases: "",
      detailedDescription: "",
      strengths: [""],
      weaknesses: [""],
      bestFor: [""],
      pricing: "",
      videoUrl: "",
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertAITool) => {
      const cleanedData = {
        ...data,
        features: data.features.filter(f => f.trim() !== ""),
        strengths: data.strengths && data.strengths.filter(s => s.trim() !== "").length > 0
          ? data.strengths.filter(s => s.trim() !== "")
          : undefined,
        weaknesses: data.weaknesses && data.weaknesses.filter(w => w.trim() !== "").length > 0
          ? data.weaknesses.filter(w => w.trim() !== "")
          : undefined,
        bestFor: data.bestFor && data.bestFor.filter(b => b.trim() !== "").length > 0
          ? data.bestFor.filter(b => b.trim() !== "")
          : undefined,
      };
      return apiRequest("POST", "/api/admin/ai-tools", cleanedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai-tools"] });
      setIsCreateOpen(false);
      form.reset();
      toast({ title: "Success", description: "AI tool created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create AI tool", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertAITool> }) => {
      const cleanedData = {
        ...data,
        features: data.features && data.features.filter(f => f.trim() !== "").length > 0
          ? data.features.filter(f => f.trim() !== "")
          : undefined,
        strengths: data.strengths && data.strengths.filter((s: string) => s.trim() !== "").length > 0
          ? data.strengths.filter((s: string) => s.trim() !== "")
          : undefined,
        weaknesses: data.weaknesses && data.weaknesses.filter((w: string) => w.trim() !== "").length > 0
          ? data.weaknesses.filter((w: string) => w.trim() !== "")
          : undefined,
        bestFor: data.bestFor && data.bestFor.filter((b: string) => b.trim() !== "").length > 0
          ? data.bestFor.filter((b: string) => b.trim() !== "")
          : undefined,
      };
      return apiRequest("PATCH", `/api/admin/ai-tools/${id}`, cleanedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai-tools"] });
      setEditingTool(null);
      form.reset();
      toast({ title: "Success", description: "AI tool updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update AI tool", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/admin/ai-tools/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai-tools"] });
      setDeletingTool(null);
      toast({ title: "Success", description: "AI tool deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete AI tool", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertAITool) => {
    if (editingTool) {
      updateMutation.mutate({ id: editingTool.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (tool: AITool) => {
    setEditingTool(tool);
    form.reset({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      link: tool.link,
      logo: tool.logo || "",
      features: tool.features,
      useCases: tool.useCases,
      detailedDescription: tool.detailedDescription || "",
      strengths: tool.strengths || [""],
      weaknesses: tool.weaknesses || [""],
      bestFor: tool.bestFor || [""],
      pricing: tool.pricing,
      videoUrl: tool.videoUrl || "",
      sortOrder: tool.sortOrder || 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">Manage AI Tools</h1>
          <p className="text-lg text-muted-foreground">
            Add, edit, or remove AI tools from the directory
          </p>
        </div>
        <Dialog
          open={isCreateOpen || editingTool !== null}
          onOpenChange={(open) => {
            if (!open) {
              setIsCreateOpen(false);
              setEditingTool(null);
              form.reset();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsCreateOpen(true)} data-testid="button-create-ai-tool">
              <Plus className="h-4 w-4 mr-2" />
              Add AI Tool
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTool ? "Edit AI Tool" : "Create AI Tool"}</DialogTitle>
              <DialogDescription>
                {editingTool ? "Update the AI tool information" : "Add a new AI tool to the directory"}
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
                        <Input {...field} placeholder="ChatGPT" data-testid="input-tool-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description..." data-testid="input-tool-description" />
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
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-tool-category">
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
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." data-testid="input-tool-link" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} placeholder="https://..." data-testid="input-tool-logo" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormDescription>One feature per line</FormDescription>
                      <FormControl>
                        <Textarea
                          value={field.value.join("\n")}
                          onChange={(e) => field.onChange(e.target.value.split("\n"))}
                          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                          data-testid="input-tool-features"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="useCases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Use Cases</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe use cases..." data-testid="input-tool-use-cases" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="strengths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strengths (optional)</FormLabel>
                      <FormDescription>One strength per line</FormDescription>
                      <FormControl>
                        <Textarea
                          value={field.value ? field.value.join("\n") : ""}
                          onChange={(e) => field.onChange(e.target.value ? e.target.value.split("\n") : [])}
                          placeholder="Strength 1&#10;Strength 2"
                          data-testid="input-tool-strengths"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weaknesses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weaknesses (optional)</FormLabel>
                      <FormDescription>One weakness per line</FormDescription>
                      <FormControl>
                        <Textarea
                          value={field.value ? field.value.join("\n") : ""}
                          onChange={(e) => field.onChange(e.target.value ? e.target.value.split("\n") : [])}
                          placeholder="Weakness 1&#10;Weakness 2"
                          data-testid="input-tool-weaknesses"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bestFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best For (optional)</FormLabel>
                      <FormDescription>One use case per line</FormDescription>
                      <FormControl>
                        <Textarea
                          value={field.value ? field.value.join("\n") : ""}
                          onChange={(e) => field.onChange(e.target.value ? e.target.value.split("\n") : [])}
                          placeholder="Use case 1&#10;Use case 2"
                          data-testid="input-tool-best-for"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pricing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pricing</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Free, $20/mo, etc." data-testid="input-tool-pricing" />
                      </FormControl>
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
                          data-testid="input-tool-sort-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-ai-tool"
                  >
                    {editingTool ? "Update" : "Create"} AI Tool
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {!isLoading &&
          tools.map((tool) => (
            <Card key={tool.id} data-testid={`admin-tool-card-${tool.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.category}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(tool)}
                      data-testid={`button-edit-${tool.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingTool(tool)}
                      data-testid={`button-delete-${tool.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
      </div>

      <AlertDialog open={deletingTool !== null} onOpenChange={(open) => !open && setDeletingTool(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete AI Tool</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingTool?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingTool && deleteMutation.mutate(deletingTool.id)}
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
