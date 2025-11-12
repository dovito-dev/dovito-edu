import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ShareButtons";
import { useQuery } from "@tanstack/react-query";
import { type Workshop as WorkshopType, type Session } from "@shared/schema";
import { BookOpen, ChevronLeft, Play, FileText } from "lucide-react";

export default function Workshop() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopType | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const { data: workshops = [], isLoading: workshopsLoading } = useQuery<WorkshopType[]>({
    queryKey: ["/api/workshops"],
  });

  const { data: sessions = [], isLoading: sessionsLoading } = useQuery<Session[]>({
    queryKey: ["/api/workshops", selectedWorkshop?.id, "sessions"],
    queryFn: () =>
      fetch(`/api/workshops/${selectedWorkshop?.id}/sessions`).then((res) => res.json()),
    enabled: !!selectedWorkshop,
  });

  const handleBackToWorkshops = () => {
    setSelectedWorkshop(null);
    setSelectedSession(null);
  };

  const handleBackToSessions = () => {
    setSelectedSession(null);
  };

  const handleSelectWorkshop = (workshop: WorkshopType) => {
    setSelectedWorkshop(workshop);
    setSelectedSession(null);
  };

  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
  };

  if (selectedSession) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToSessions}
            data-testid="button-back-to-sessions"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Sessions
          </Button>
          <div className="flex-1">
            <h1 className="font-heading font-bold text-3xl">{selectedSession.title}</h1>
            {selectedSession.description && (
              <p className="text-muted-foreground">{selectedSession.description}</p>
            )}
          </div>
          <ShareButtons title={`Check out ${selectedSession.title}!`} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedSession.title}</CardTitle>
            <CardDescription>
              {selectedSession.htmlContentUrl && "Interactive HTML presentation - Use arrow keys or touch to navigate through slides"}
              {selectedSession.videoUrl && !selectedSession.htmlContentUrl && "Watch the session video"}
              {selectedSession.duration && ` • ${selectedSession.duration}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {selectedSession.htmlContentUrl && (
              <div className="w-full bg-background rounded-b-lg overflow-hidden">
                <iframe
                  src={selectedSession.htmlContentUrl}
                  className="w-full h-[calc(100vh-280px)] min-h-[600px] border-0"
                  title={selectedSession.title}
                  allowFullScreen
                  loading="lazy"
                  data-testid={`iframe-session-${selectedSession.id}`}
                />
              </div>
            )}
            {selectedSession.videoUrl && !selectedSession.htmlContentUrl && (
              <div className="w-full bg-background rounded-b-lg overflow-hidden p-6">
                <div className="aspect-video">
                  <iframe
                    src={selectedSession.videoUrl}
                    className="w-full h-full border-0 rounded-lg"
                    title={selectedSession.title}
                    allowFullScreen
                    loading="lazy"
                    data-testid={`iframe-video-${selectedSession.id}`}
                  />
                </div>
              </div>
            )}
            {!selectedSession.htmlContentUrl && !selectedSession.videoUrl && (
              <div className="p-6 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Session content coming soon...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedWorkshop) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToWorkshops}
            data-testid="button-back-to-workshops"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Workshops
          </Button>
          <div className="flex-1">
            <h1 className="font-heading font-bold text-4xl">{selectedWorkshop.title}</h1>
            <p className="text-lg text-muted-foreground">{selectedWorkshop.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessionsLoading && <div className="text-center py-8">Loading sessions...</div>}
          {!sessionsLoading && sessions.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No sessions available yet. Check back soon!</p>
              </CardContent>
            </Card>
          )}
          {!sessionsLoading &&
            sessions.map((session) => (
              <Card
                key={session.id}
                className="hover-elevate cursor-pointer transition-all"
                onClick={() => handleSelectSession(session)}
                data-testid={`session-card-${session.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {session.htmlContentUrl && <FileText className="h-5 w-5" />}
                        {session.videoUrl && !session.htmlContentUrl && <Play className="h-5 w-5" />}
                        {session.title}
                      </CardTitle>
                      {session.duration && (
                        <CardDescription className="mt-1">{session.duration}</CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {session.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{session.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">Workshops</h1>
          <p className="text-lg text-muted-foreground">
            Explore our AI and mortgage industry training sessions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShareButtons title="Check out Dovito EDU Workshops!" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshopsLoading && <div className="text-center py-8">Loading workshops...</div>}
        {!workshopsLoading && workshops.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No workshops available yet. Check back soon!</p>
            </CardContent>
          </Card>
        )}
        {!workshopsLoading &&
          workshops.map((workshop) => (
            <Card
              key={workshop.id}
              className="hover-elevate cursor-pointer transition-all"
              onClick={() => handleSelectWorkshop(workshop)}
              data-testid={`workshop-card-${workshop.id}`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{workshop.title}</CardTitle>
                    <CardDescription className="mt-2">{workshop.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
