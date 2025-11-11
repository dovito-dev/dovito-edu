import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShareButtons } from "@/components/ShareButtons";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sessions = [
  { id: 1, title: "Introduction to AI & Machine Learning", duration: "45 min" },
  { id: 2, title: "Understanding Large Language Models", duration: "60 min" },
  { id: 3, title: "Practical Applications of AI in Business", duration: "50 min" },
  { id: 4, title: "Prompt Engineering Fundamentals", duration: "55 min" },
  { id: 5, title: "AI Ethics and Responsible Use", duration: "40 min" },
  { id: 6, title: "Building AI-Powered Workflows", duration: "65 min" },
];

export default function Workshop() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [selectedSession, setSelectedSession] = useState(1);
  const totalSlides = 24;

  const handleDownload = () => {
    console.log("Download session", selectedSession);
  };

  const handleFullscreen = () => {
    console.log("Enter fullscreen");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">
            Dovito x Fairway Mortgage AI Workshop
          </h1>
          <p className="text-lg text-muted-foreground">
            Interactive learning sessions on AI and automation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShareButtons title="Check out this AI Workshop!" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Session {selectedSession}: {sessions[selectedSession - 1].title}</CardTitle>
                  <CardDescription className="mt-1">
                    Slide {currentSlide} of {totalSlides}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownload}
                    data-testid="button-download-session"
                    aria-label="Download session"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFullscreen}
                    data-testid="button-fullscreen"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-sessions-mobile">
                        <List className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sessions</SheetTitle>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
                        <div className="space-y-2">
                          {sessions.map((session) => (
                            <button
                              key={session.id}
                              onClick={() => {
                                setSelectedSession(session.id);
                                setCurrentSlide(1);
                              }}
                              className={`w-full text-left p-3 rounded-lg transition-colors hover-elevate active-elevate-2 ${
                                selectedSession === session.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                              data-testid={`session-${session.id}`}
                            >
                              <p className="font-medium text-sm">Session {session.id}</p>
                              <p className="text-sm opacity-90 line-clamp-2">{session.title}</p>
                              <p className="text-xs opacity-75 mt-1">{session.duration}</p>
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">
                    Interactive HTML slide deck would be embedded here
                  </p>
                  <p className="font-heading font-bold text-2xl">
                    Slide {currentSlide} / {totalSlides}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                  disabled={currentSlide === 1}
                  data-testid="button-previous-slide"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentSlide} / {totalSlides}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))}
                  disabled={currentSlide === totalSlides}
                  data-testid="button-next-slide"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle>All Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-2">
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => {
                        setSelectedSession(session.id);
                        setCurrentSlide(1);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors hover-elevate active-elevate-2 ${
                        selectedSession === session.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                      data-testid={`session-${session.id}`}
                    >
                      <p className="font-medium text-sm">Session {session.id}</p>
                      <p className="text-sm opacity-90 line-clamp-2">{session.title}</p>
                      <p className="text-xs opacity-75 mt-1">{session.duration}</p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
