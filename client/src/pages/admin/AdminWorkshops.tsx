import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, BookOpen, ChevronDown, ChevronRight, Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertWorkshopSchema, insertSessionSchema, type Workshop, type Session, type InsertWorkshop, type InsertSession } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useSession } from "@/hooks/useSession";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function AdminWorkshops() {
  const { isAdmin, isLoading: sessionLoading } = useSession();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [isCreateWorkshopOpen, setIsCreateWorkshopOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [deletingWorkshop, setDeletingWorkshop] = useState<Workshop | null>(null);

  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [deletingSession, setDeletingSession] = useState<Session | null>(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const [expandedWorkshops, setExpandedWorkshops] = useState<Set<string>>(new Set());
  const [contentSource, setContentSource] = useState<"url" | "upload">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!sessionLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      });
      setLocation("/dashboard");
    }
  }, [isAdmin, sessionLoading, setLocation, toast]);

  const { data: workshops = [], isLoading: workshopsLoading } = useQuery<Workshop[]>({
    queryKey: ["/api/workshops"],
  });

  const { data: allSessions = [] } = useQuery<Session[]>({
    queryKey: ["/api/workshops/sessions"],
    queryFn: async () => {
      const sessionsArrays = await Promise.all(
        workshops.map((workshop) =>
          fetch(`/api/workshops/${workshop.id}/sessions`).then((res) => res.json())
        )
      );
      return sessionsArrays.flat();
    },
    enabled: workshops.length > 0,
  });

  const workshopForm = useForm<InsertWorkshop>({
    resolver: zodResolver(insertWorkshopSchema),
    defaultValues: {
      title: "",
      description: "",
      sortOrder: 0,
    },
  });

  const sessionForm = useForm<InsertSession>({
    resolver: zodResolver(insertSessionSchema),
    defaultValues: {
      workshopId: "",
      title: "",
      description: "",
      duration: "",
      htmlContentUrl: "",
      videoUrl: "",
      sortOrder: 0,
    },
  });

  const createWorkshopMutation = useMutation({
    mutationFn: (data: InsertWorkshop) =>
      apiRequest("POST", "/api/admin/workshops", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshops"] });
      setIsCreateWorkshopOpen(false);
      workshopForm.reset();
      toast({ title: "Success", description: "Workshop created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create workshop", variant: "destructive" });
    },
  });

  const updateWorkshopMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertWorkshop> }) =>
      apiRequest("PATCH", `/api/admin/workshops/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshops"] });
      setEditingWorkshop(null);
      workshopForm.reset();
      toast({ title: "Success", description: "Workshop updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update workshop", variant: "destructive" });
    },
  });

  const deleteWorkshopMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/workshops/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshops"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workshops/sessions"] });
      setDeletingWorkshop(null);
      toast({ title: "Success", description: "Workshop deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete workshop", variant: "destructive" });
    },
  });

  const createSessionMutation = useMutation({
    mutationFn: (data: InsertSession) =>
      apiRequest("POST", "/api/admin/sessions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshops/sessions"] });
      setIsCreateSessionOpen(false);
      setSelectedWorkshopId(null);
      sessionForm.reset();
      toast({ title: "Success", description: "Session created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create session", variant: "destructive" });
    },
  });

  const updateSessionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertSession> }) =>
      apiRequest("PATCH", `/api/admin/sessions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshops/sessions"] });
      setEditingSession(null);
      sessionForm.reset();
      toast({ title: "Success", description: "Session updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update session", variant: "destructive" });
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/sessions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshops/sessions"] });
      setDeletingSession(null);
      toast({ title: "Success", description: "Session deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete session", variant: "destructive" });
    },
  });

  const onWorkshopSubmit = (data: InsertWorkshop) => {
    if (editingWorkshop) {
      updateWorkshopMutation.mutate({ id: editingWorkshop.id, data });
    } else {
      createWorkshopMutation.mutate(data);
    }
  };

  const onSessionSubmit = async (data: InsertSession) => {
    try {
      let finalData = { ...data };

      if (contentSource === "upload" && selectedFile) {
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append("htmlFile", selectedFile);

        const response = await fetch("/api/admin/sessions/upload-html", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to upload file");
        }

        const uploadResult = await response.json();
        finalData.htmlContentUrl = uploadResult.path;
        setIsUploading(false);
      }

      if (editingSession) {
        updateSessionMutation.mutate({ id: editingSession.id, data: finalData });
      } else {
        createSessionMutation.mutate(finalData);
      }
    } catch (error) {
      setIsUploading(false);
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "Failed to upload HTML file",
        variant: "destructive",
      });
    }
  };

  const openEditWorkshopDialog = (workshop: Workshop) => {
    setEditingWorkshop(workshop);
    workshopForm.reset({
      title: workshop.title,
      description: workshop.description,
      sortOrder: workshop.sortOrder,
    });
  };

  const openCreateSessionDialog = (workshopId: string) => {
    setSelectedWorkshopId(workshopId);
    setIsCreateSessionOpen(true);
    setContentSource("url");
    setSelectedFile(null);
    sessionForm.reset({
      workshopId,
      title: "",
      description: "",
      duration: "",
      htmlContentUrl: "",
      videoUrl: "",
      sortOrder: 0,
    });
  };

  const openEditSessionDialog = (session: Session) => {
    setEditingSession(session);
    setContentSource(session.htmlContentUrl?.startsWith("/uploads/") ? "upload" : "url");
    setSelectedFile(null);
    sessionForm.reset({
      workshopId: session.workshopId,
      title: session.title,
      description: session.description || "",
      duration: session.duration || "",
      htmlContentUrl: session.htmlContentUrl || "",
      videoUrl: session.videoUrl || "",
      sortOrder: session.sortOrder,
    });
  };

  const toggleWorkshop = (workshopId: string) => {
    const newExpanded = new Set(expandedWorkshops);
    if (newExpanded.has(workshopId)) {
      newExpanded.delete(workshopId);
    } else {
      newExpanded.add(workshopId);
    }
    setExpandedWorkshops(newExpanded);
  };

  const getWorkshopSessions = (workshopId: string): Session[] => {
    return allSessions.filter((session) => session.workshopId === workshopId);
  };

  if (sessionLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">Manage Workshops</h1>
          <p className="text-lg text-muted-foreground">
            Create and organize workshop sessions and content
          </p>
        </div>
        <Dialog
          open={isCreateWorkshopOpen || editingWorkshop !== null}
          onOpenChange={(open) => {
            if (!open) {
              setIsCreateWorkshopOpen(false);
              setEditingWorkshop(null);
              workshopForm.reset();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsCreateWorkshopOpen(true)} data-testid="button-create-workshop">
              <Plus className="h-4 w-4 mr-2" />
              Add Workshop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingWorkshop ? "Edit Workshop" : "Create Workshop"}</DialogTitle>
              <DialogDescription>
                {editingWorkshop ? "Update workshop information" : "Add a new workshop series"}
              </DialogDescription>
            </DialogHeader>
            <Form {...workshopForm}>
              <form onSubmit={workshopForm.handleSubmit(onWorkshopSubmit)} className="space-y-4">
                <FormField
                  control={workshopForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="AI Fundamentals" data-testid="input-workshop-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={workshopForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Workshop description..." data-testid="input-workshop-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={workshopForm.control}
                  name="sortOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value ?? 0}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          data-testid="input-workshop-sort"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateWorkshopOpen(false);
                      setEditingWorkshop(null);
                      workshopForm.reset();
                    }}
                    data-testid="button-cancel-workshop"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-workshop">
                    {editingWorkshop ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog
        open={isCreateSessionOpen || editingSession !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateSessionOpen(false);
            setEditingSession(null);
            setSelectedWorkshopId(null);
            sessionForm.reset();
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSession ? "Edit Session" : "Create Session"}</DialogTitle>
            <DialogDescription>
              {editingSession ? "Update session information" : "Add a new session to the workshop"}
            </DialogDescription>
          </DialogHeader>
          <Form {...sessionForm}>
            <form onSubmit={sessionForm.handleSubmit(onSessionSubmit)} className="space-y-4">
              <FormField
                control={sessionForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Session 1: Introduction" data-testid="input-session-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sessionForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value || ""} placeholder="Session overview..." data-testid="input-session-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sessionForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} placeholder="60 minutes" data-testid="input-session-duration" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>HTML Content Source</FormLabel>
                  <RadioGroup value={contentSource} onValueChange={(value) => setContentSource(value as "url" | "upload")} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="url" id="source-url" data-testid="radio-content-source-url" />
                      <Label htmlFor="source-url" className="flex items-center gap-2 cursor-pointer">
                        <LinkIcon className="h-4 w-4" />
                        URL
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upload" id="source-upload" data-testid="radio-content-source-upload" />
                      <Label htmlFor="source-upload" className="flex items-center gap-2 cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Upload HTML
                      </Label>
                    </div>
                  </RadioGroup>
                </FormItem>

                {contentSource === "url" && (
                  <FormField
                    control={sessionForm.control}
                    name="htmlContentUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HTML Content URL (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="/workshops/session1/index.html" data-testid="input-session-html-url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {contentSource === "upload" && (
                  <FormItem>
                    <FormLabel>Upload HTML File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".html,text/html"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            sessionForm.setValue("htmlContentUrl", "");
                          }
                        }}
                        data-testid="input-session-html-file"
                      />
                    </FormControl>
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                      </p>
                    )}
                    {editingSession && editingSession.htmlContentUrl?.startsWith("/uploads/") && !selectedFile && (
                      <p className="text-sm text-muted-foreground">
                        Current file: {editingSession.htmlContentUrl.split("/").pop()}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              </div>
              <FormField
                control={sessionForm.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} placeholder="https://youtube.com/..." data-testid="input-session-video-url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sessionForm.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        data-testid="input-session-sort"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateSessionOpen(false);
                    setEditingSession(null);
                    setSelectedWorkshopId(null);
                    sessionForm.reset();
                  }}
                  data-testid="button-cancel-session"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading || (contentSource === "upload" && !selectedFile && !editingSession)} data-testid="button-save-session">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    editingSession ? "Update" : "Create"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {workshopsLoading && <div className="text-center py-8">Loading workshops...</div>}
        {!workshopsLoading && workshops.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No workshops yet. Create your first workshop to get started!</p>
            </CardContent>
          </Card>
        )}
        {!workshopsLoading &&
          workshops.map((workshop) => {
            const sessions = getWorkshopSessions(workshop.id);
            const isExpanded = expandedWorkshops.has(workshop.id);

            return (
              <Card key={workshop.id} data-testid={`admin-workshop-card-${workshop.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleWorkshop(workshop.id)}
                          data-testid={`button-toggle-workshop-${workshop.id}`}
                        >
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                        <div>
                          <CardTitle>{workshop.title}</CardTitle>
                          <CardDescription>{sessions.length} sessions</CardDescription>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCreateSessionDialog(workshop.id)}
                        data-testid={`button-add-session-${workshop.id}`}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Session
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditWorkshopDialog(workshop)}
                        data-testid={`button-edit-workshop-${workshop.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletingWorkshop(workshop)}
                        data-testid={`button-delete-workshop-${workshop.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{workshop.description}</p>
                  {isExpanded && (
                    <div className="space-y-2 mt-4 pl-6 border-l-2">
                      {sessions.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">No sessions yet. Add a session to get started.</p>
                      ) : (
                        sessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex justify-between items-center p-3 rounded-md hover-elevate"
                            data-testid={`admin-session-${session.id}`}
                          >
                            <div>
                              <p className="font-medium">{session.title}</p>
                              {session.duration && <p className="text-sm text-muted-foreground">{session.duration}</p>}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditSessionDialog(session)}
                                data-testid={`button-edit-session-${session.id}`}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeletingSession(session)}
                                data-testid={`button-delete-session-${session.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </div>

      <AlertDialog open={deletingWorkshop !== null} onOpenChange={() => setDeletingWorkshop(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Workshop</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingWorkshop?.title}"? This will also delete all associated sessions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-workshop">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingWorkshop && deleteWorkshopMutation.mutate(deletingWorkshop.id)}
              data-testid="button-confirm-delete-workshop"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deletingSession !== null} onOpenChange={() => setDeletingSession(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingSession?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-session">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingSession && deleteSessionMutation.mutate(deletingSession.id)}
              data-testid="button-confirm-delete-session"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
