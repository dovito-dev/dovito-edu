import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButtons } from "@/components/ShareButtons";

export default function Workshop() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">
            Dovito x Fairway Mortgage AI Workshop
          </h1>
          <p className="text-lg text-muted-foreground">
            Session 1: Talking to AI - Immersive Experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShareButtons title="Check out this AI Workshop!" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session 1: Welcome to AI - The Future of Mortgage</CardTitle>
          <CardDescription>
            Interactive HTML presentation - Use arrow keys or touch to navigate through slides
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full bg-background rounded-b-lg overflow-hidden">
            <iframe
              src="/workshops/session1/index.html"
              className="w-full h-[calc(100vh-280px)] min-h-[600px] border-0"
              title="Session 1: Talking to AI - Immersive Experience"
              allowFullScreen
              loading="lazy"
              data-testid="iframe-session-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
